import { Injectable, NotFoundException } from '@nestjs/common';
import { SubTaskCollaborator } from './sub-task-collaborators.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { UsersService } from '../users/users.service';
import { SubtasksService } from '../subtasks/subtasks.service';
import { CreateOrUpdateSubTaskCollaborators } from './dto/createOrUpdateSubTaskCollaborators.dto';
import { SubTaskCollaboratorResponse } from 'src/interfaces';

@Injectable()
export class SubTaskCollaboratorsService {
    constructor(
        @InjectModel('SubTaskCollaborator')
        private readonly subTaskCollaboratorModel: Model<SubTaskCollaborator>,
        private readonly usersService: UsersService,
        private readonly subTasksService: SubtasksService,
      ) {}
    
      async addSubTaskCollaborator(
        subTaskId: string,
        body: CreateOrUpdateSubTaskCollaborators,
      ): Promise<SubTaskCollaboratorResponse> {
        const { userId } = body;
        const project = await this.subTasksService.getSubTaskById(subTaskId);
        
        if (!project) {
          throw new NotFoundException('Sub-Task not found');
        }
        
        const collaborator = await this.subTaskCollaboratorModel.create({
          userId,
          subTaskId,
        });
    
        return {
          message: 'SubTask Collaborator Added',
        };
      }
    
      async getCollaborators(
        subTaskId: string,
      ): Promise<SubTaskCollaboratorResponse> {
        const collaborators = await this.subTaskCollaboratorModel
          .find({ subTaskId: subTaskId })
          .populate('userId')
          .exec();
    
        return {
          message: 'All Collaborators For this project',
          data: collaborators,
        };
      }
    
      async removeCollaborator(
        subTaskId: string,
        collaboratorId: string,
      ): Promise<SubTaskCollaboratorResponse> {
        const deletedCollaborator =
          await this.subTaskCollaboratorModel.findOneAndDelete({
            subTaskId: subTaskId,
            _id: collaboratorId,
          });
        return {
          message: 'Removed SubTask Collaborator',
        };
      }
}
