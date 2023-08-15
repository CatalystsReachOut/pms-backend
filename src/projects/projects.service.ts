import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { ProjectDto, UpdateProjectDto } from './dto/projects.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { Project } from './projects.schema';
import { UsersService } from '../users/users.service';
import { ProjectResponse } from 'src/interfaces';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectModel('Project') private readonly projectModel: Model<Project>,
    private readonly usersService: UsersService,
  ) {}

  async createProject(
    userId: string,
    body: ProjectDto,
  ): Promise<ProjectResponse> {
    let { name, createdBy, startDate, endDate, thumbnail } = body;
    const isExistUser = await this.usersService.findOneById(userId);
    if (!isExistUser) {
      throw new NotFoundException('user not found');
    }
    const newProject = new this.projectModel({
      name,
      createdBy: userId,
      thumbnail,
      endDate,
      startDate,
    });

    await newProject.save();

    return {
      message: `new project successfully created`,
    };
  }

  async getAllProject(): Promise<ProjectResponse> {
    const allProjects = await this.projectModel.find({});
    return {
      data: allProjects,
    };
  }

  async getProjectById(projectId: string): Promise<ProjectResponse | never> {
    const isExistProject = await this.projectModel.findById(projectId);

    if (!isExistProject) {
      throw new NotFoundException('Project not found');
    }

    return {
      data: isExistProject,
    };
  }

  async updateProject(
    body: UpdateProjectDto,
    projectId: string,
  ): Promise<ProjectResponse | never> {
    const { name, createdBy, isCompleted, endDate, startDate, thumbnail } =
      body;

    // let userId = created_By.toString();

    // const isExistUser = await this.usersService.findOneById(userId);

    // if (!isExistUser) {
    //     throw new NotFoundException('user not found')
    // }

    const isExistProject = await this.projectModel.findById(projectId);

    if (!isExistProject) {
      throw new NotFoundException('Project not found');
    }

    isExistProject.name = name;
    isExistProject.createdBy = createdBy;
    isExistProject.thumbnail = thumbnail;
    isExistProject.isCompleted = isCompleted;
    isExistProject.startDate = startDate;
    isExistProject.endDate = endDate;

    await isExistProject.save();

    return {
      message: `Project Updated Successfully!`,
    };
  }

  async deleteProject(projectId: string): Promise<ProjectResponse | never> {
    const deletedProject = await this.projectModel.findByIdAndDelete(projectId);
    if (!deletedProject) {
      return {
        message: 'no such project of given id',
      };
    }
    return {
      message: `Project deleted successfully`,
    };
  }
}
