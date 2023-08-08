import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Status } from './statuses.schema';
import { Model } from 'mongoose';
import { CreateOrUpdateStatusDto } from './dto/createStatus.dto';
import { StatusResponse } from 'src/interfaces';

@Injectable()
export class StatusesService {
  constructor(
    @InjectModel('Status') private readonly statusModel: Model<Status>,
  ) {}

  async findOneById(id: string): Promise<StatusResponse | null> {
    const status = await this.statusModel.findById(id).exec();
    console.log(status);
    
    return {
      message: 'Status with given Id',
      data: status,
    };
  }

  async createStatus(
    body: CreateOrUpdateStatusDto,
  ): Promise<StatusResponse | null> {
    const { name } = body;
    const newUser = new this.statusModel({ name });
    await newUser.save();
    return {
      message: 'Status Added Successfully!',
    };
  }

  async updateStatus(
    statusId: string,
    body: CreateOrUpdateStatusDto,
  ): Promise<StatusResponse | null> {
    const { name } = body;
    const updatedStatus = await this.statusModel.findByIdAndUpdate(
      statusId,
      { name },
      { new: true },
    );

    if (!updatedStatus) {
      throw new NotFoundException(`Status with given id not found`);
    }

    return {
      message: 'Status Updated Successfully!',
    };
  }

  async deleteStatus(statusId: string): Promise<StatusResponse | null> {
    const deleteStatus = await this.statusModel.findByIdAndDelete(statusId);

    if (!deleteStatus) {
      throw new NotFoundException(`Status with given id not found`);
    }
    return {
      message: 'Status Deleted Successfully',
    };
  }

  async findAll(): Promise<StatusResponse | null> {
    const statuses = await this.statusModel.find({});

    if (statuses.length === 0) {
      throw new NotFoundException(`Statuses doesn't exist`);
    }

    return {
      message: 'All Statuses!',
      data: statuses,
    };
  }
}
