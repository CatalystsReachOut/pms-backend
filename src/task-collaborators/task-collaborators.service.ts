import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TaskCollaborator } from './task-collaborators.schema';
import { UsersService } from '../users/users.service';
import { TasksService } from '../tasks/tasks.service';
import { CreateOrUpdateTaskCollaboratorsDto } from './dto/createOrUpdateTaskCollaborators.dto';
import { TaskCollaboratorResponse } from 'src/interfaces';

@Injectable()
export class TaskCollaboratorsService {
    constructor(
        @InjectModel('TaskCollaborator')
        private readonly taskCollaboratorModel: Model<TaskCollaborator>,
        private readonly usersService: UsersService,
        private readonly tasksService: TasksService,
      ) {}
    
      async addTaskCollaborator(
        taskId: string,
        body: CreateOrUpdateTaskCollaboratorsDto,
      ): Promise<TaskCollaboratorResponse> {
        const { userId } = body;
        const task = await this.tasksService.getTaskById(taskId);
        
        if (!task) {
          throw new NotFoundException('Task not found');
        }
        
        const collaborator = await this.taskCollaboratorModel.create({
          userId,
          taskId,
        });
    
        return {
          message: 'Task Collaborator Added',
        };
      }
    
      async getCollaborators(
        taskId: string,
      ): Promise<TaskCollaboratorResponse> {
        const collaborators = await this.taskCollaboratorModel
          .find({ taskId: taskId })
          .populate('userId')
          .exec();
    
        return {
          message: 'All Collaborators For this task',
          data: collaborators,
        };
      }
    
      async removeCollaborator(
        taskId: string,
        collaboratorId: string,
      ): Promise<TaskCollaboratorResponse> {
        const deletedCollaborator =
          await this.taskCollaboratorModel.findOneAndDelete({
            taskId: taskId,
            _id: collaboratorId,
          });
        return {
          message: 'Removed Task Collaborator',
        };
      }
}
