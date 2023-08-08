import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Priority } from './priorities.schema';
import { PriorityResponse } from 'src/interfaces';
import { CreateOrUpdatePriorityDto } from './dto/createOrUpdatePriority.dto';

@Injectable()
export class PrioritiesService {
  constructor(
    @InjectModel('Priority') private readonly priorityModel: Model<Priority>,
  ) {}

  async findOneById(id: string): Promise<PriorityResponse | null> {
    const priority = await this.priorityModel.findById(id).exec();
    return {
      message: 'Priority with given Id',
      data: priority,
    };
  }

  async createPriority(
    body: CreateOrUpdatePriorityDto,
  ): Promise<PriorityResponse | null> {
    const { name } = body;
    const newPriority = new this.priorityModel({ name });
    await newPriority.save();
    return {
      message: 'Priority Added Successfully!',
    };
  }

  async updatePriority(
    priorityId: string,
    body: CreateOrUpdatePriorityDto,
  ): Promise<PriorityResponse | null> {
    const { name } = body;
    const updatedPriority = await this.priorityModel.findByIdAndUpdate(
      priorityId,
      { name },
      { new: true },
    );

    if (!updatedPriority) {
      throw new NotFoundException(`Priority with given id not found`);
    }

    return {
      message: 'Priority Updated Successfully!',
    };
  }

  async deletePriority(priorityId: string): Promise<PriorityResponse | null> {
    const deletePriority = await this.priorityModel.findByIdAndDelete(
      priorityId,
    );

    if (!deletePriority) {
      throw new NotFoundException(`Priority with given id not found`);
    }
    return {
      message: 'Priority Deleted Successfully',
    };
  }

  async findAll(): Promise<PriorityResponse | null> {
    const priorities = await this.priorityModel.find({});

    if (priorities.length === 0) {
      throw new NotFoundException(`Priorities doesn't exist`);
    }

    return {
      message: 'All Priorities!',
      data: priorities,
    };
  }
}
