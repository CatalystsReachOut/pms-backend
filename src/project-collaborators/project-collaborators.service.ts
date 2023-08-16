import { Injectable, NotFoundException } from '@nestjs/common';
import { ProjectCollaborator } from './project-collaborators.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ProjectCollaboratorResponse } from 'src/interfaces';
import { CreateOrUpdateProjectCollaboratorsDto } from './dto/createOrUpdateProjectCollaborators.dto';
import { UsersService } from '../users/users.service';
import { ProjectsService } from '../projects/projects.service';

@Injectable()
export class ProjectCollaboratorsService {
  constructor(
    @InjectModel('ProjectCollaborator')
    private readonly projectCollaboratorModel: Model<ProjectCollaborator>,
    private readonly usersService: UsersService,
    private readonly projectsService: ProjectsService,
  ) {}

  async addProjectCollaborator(
    projectId: string,
    body: CreateOrUpdateProjectCollaboratorsDto,
  ): Promise<ProjectCollaboratorResponse> {
    const { userId } = body;
    const project = await this.projectsService.getProjectById(projectId);
    console.log(project);
    
    if (!project) {
      throw new NotFoundException('Project not found');
    }
    const collaborator = await this.projectCollaboratorModel.create({
      userId,
      projectId,
    });

    return {
      message: 'Project Collaborator Added',
    };
  }

  async getCollaborators(
    projectId: string,
  ): Promise<ProjectCollaboratorResponse> {
    const collaborators = await this.projectCollaboratorModel
      .find({ projectId: projectId })

      .populate('userId')
      .exec();

    return {
      message: 'All Collaborators For this project',
      data: collaborators,
    };
  }

  async removeCollaborator(
    projectId: string,
    collaboratorId: string,
  ): Promise<ProjectCollaboratorResponse> {
    const deletedCollaborator =
      await this.projectCollaboratorModel.findOneAndDelete({
        projectId: projectId,
        _id: collaboratorId,
      });
    return {
      message: 'Removed Project Collaborator',
    };
  }
}
