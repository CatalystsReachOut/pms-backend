import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task } from './tasks.schema';
import { UsersService } from '../users/users.service';
import { TaskResponse } from 'src/interfaces';
import { CreateTaskDto } from './dto/createTask.dto';
import { UpdateTaskDto } from './dto/updateTask.dto';
import { ProjectsService } from '../projects/projects.service';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel('Task') private readonly taskModel: Model<Task>,
    private readonly usersService: UsersService,
    private readonly projectsService: ProjectsService,
  ) {}

  async createTask(body: CreateTaskDto): Promise<TaskResponse> {
    let {
      name,
      description,
      projectId,
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
      projectId,
      prirorityId,
      startDate,
      endDate,
      createdBy,
      statusId,
    }

    const newTask = await this.taskModel.create(dataToStore)
    return {
      message: `New Task Successfully Created`,
    };
  }

  async getAllTaskByProjectId(projectId: string): Promise<TaskResponse> {
    const projectExists = await this.projectsService.getProjectById(projectId);
    if(!projectExists){
      return {
        message:"No Project exists with this id.",
        data : null
      }
    }
    const tasks =  await this.taskModel.find({projectId:projectId});
    return {
      message:"All task for the given project Id",
      data: tasks,
    };
  }

  async getTaskById(taskId: string): Promise<TaskResponse> {
    const taskExists = await this.taskModel.findById(taskId);

    if (!taskExists) {
      throw new NotFoundException('Task not found');
    }

    return {
      data: taskExists,
    };
  }

  async updateProject(
    body: UpdateTaskDto,
    taskId: string,
  ): Promise<TaskResponse> {
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

    const taskExists = await this.taskModel.findById(taskId);

    if (!taskExists) {
      throw new NotFoundException('Task not found');
    }

    const updateTaskData = {
      name: name || taskExists?.name,
      description: description || taskExists?.description,
      projectId: projectId || taskExists?.projectId,
      prirorityId: prirorityId || taskExists?.prirorityId,
      startDate: startDate || taskExists?.startDate,
      endDate: endDate || taskExists?.endDate,
      createdBy: createdBy || taskExists?.createdBy,
      statusId: statusId || taskExists?.statusId,
    };

    const updatedTask = await this.taskModel.updateOne({ _id: taskId }, updateTaskData);

    return {
      message: `Task updated successfully!`,
    };
  }

  async deleteProject(taskId: string): Promise<TaskResponse> {
    const deletedProject = await this.taskModel.findByIdAndDelete(taskId);

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
