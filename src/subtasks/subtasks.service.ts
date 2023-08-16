import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SubTask } from './subtasks.schema';
import { UsersService } from '../users/users.service';
import { TasksService } from '../tasks/tasks.service';
import { CreateSubTaskDto } from './dto/createSubTask.dto';
import { SubTaskResponse } from 'src/interfaces';
import { UpdateSubTaskDto } from './dto/updateSubTask.dto';

@Injectable()
export class SubtasksService {
  constructor(
    @InjectModel('SubTask') private readonly subTaskModel: Model<SubTask>,
    private readonly usersService: UsersService,
    private readonly tasksService: TasksService,
  ) {}

  async createSubTask(body: CreateSubTaskDto): Promise<SubTaskResponse> {
    let {
      name,
      description,
      taskId,
      prirorityId,
      startDate,
      endDate,
      createdBy,
      statusId,
    } = body;

    // changing objectid type of createdby into string
    // const userId = createdBy.toString();

    // const isExistUser = await this.usersService.findOneById(userId);
    // if (!isExistUser) {
    //   throw new NotFoundException('user not found');
    // }

    const dataToStore = {
      name: name,
      description,
      taskId,
      prirorityId,
      startDate,
      endDate,
      createdBy,
      statusId,
    };

    const newTask = await this.subTaskModel.create(dataToStore);
    return {
      message: `New Task Successfully Created`,
    };
  }

  //   async getAllTaskByProjectId(projectId: string): Promise<SubTaskResponse> {
  //     const projectExists = await this.tasksService.getProjectById(projectId);
  //     if(!projectExists){
  //       return {
  //         message:"No Project exists with this id.",
  //         data : null
  //       }
  //     }
  //     const tasks =  await this.taskModel.find({projectId:projectId});
  //     return {
  //       message:"All task for the given project Id",
  //       data: tasks,
  //     };
  //   }

  async getSubTaskById(taskId: string): Promise<SubTaskResponse> {
    const taskExists = await this.subTaskModel.findById(taskId);

    if (!taskExists) {
      throw new NotFoundException('Task not found');
    }

    return {
      data: taskExists,
    };
  }

  async updateSubTask(
    body: UpdateSubTaskDto,
    taskId: string,
  ): Promise<SubTaskResponse> {
    const {
      name,
      description,
      projectId,
      prirorityId,
      startDate,
      endDate,
      createdBy,
      statusId,
    } = body;

    // let userId = created_By.toString();

    // const isExistUser = await this.usersService.findOneById(userId);

    // if (!isExistUser) {
    //   throw new NotFoundException('user not found');
    // }

    const taskExists = await this.subTaskModel.findById(taskId);

    if (!taskExists) {
      throw new NotFoundException('Task not found');
    }

    const updateTaskData = {
      name: name || taskExists?.name,
      description: description || taskExists?.description,
      taskId: taskId || taskExists?.taskId,
      prirorityId: prirorityId || taskExists?.prirorityId,
      startDate: startDate || taskExists?.startDate,
      endDate: endDate || taskExists?.endDate,
      createdBy: createdBy || taskExists?.createdBy,
      statusId: statusId || taskExists?.statusId,
    };

    const updatedTask = await this.subTaskModel.updateOne(
      { _id: taskId },
      updateTaskData,
    );

    return {
      message: `Task updated successfully!`,
    };
  }

  async deleteSubTask(taskId: string): Promise<SubTaskResponse> {
    const deletedProject = await this.subTaskModel.findByIdAndDelete(taskId);

    if (!deletedProject) {
      return {
        message: 'No such task of given id',
      };
    }

    return {
      message: `Task deleted successfully with id.`,
    };
  }
}
