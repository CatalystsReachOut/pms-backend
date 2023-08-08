import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { ProjectDto, UpdateProjectDto } from './dto/projects.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Project } from './projects.schema';
import { UsersService } from '../users/users.service';
import { StatusResponse } from 'src/interfaces';

@Injectable()
export class ProjectsService {

    constructor(
        @InjectModel('Project') private readonly projectModel: Model<Project>,
        private readonly usersService: UsersService
    ) { }

    async create(body: ProjectDto): Promise<StatusResponse | never> {
        let { name, created_By, start_Date, end_Date, thumbnail } = body;

        // changing objectid type of createdby into string
        const userId = created_By.toString();

        const isExistUser = await this.usersService.findOneById(userId);
        if (!isExistUser) {
            throw new NotFoundException('user not found')
        }
        const newProject = new this.projectModel(
            {
                name: name,
                created_By,
                thumbnail,
                end_Date,
                start_Date
            }
        );

        await newProject.save()

        return {
            success: true,
            message: `new project successfully created`
        }
    }

    async getAllProject(): Promise<StatusResponse> {
        const allProjects = await this.projectModel.find({});
        return {
            success: true,
            data: allProjects
        }

    }

    async getProjectById(id: string): Promise<StatusResponse | never> {
        const isExistProject = await this.projectModel.findById(id);

        if (!isExistProject) {
            throw new NotFoundException('Project not found');
        }

        return {
            success: true,
            data: isExistProject
        }
    }

    async updateProject(body: UpdateProjectDto, id: string): Promise<StatusResponse | never> {
        const { name, created_By, is_Completed, end_Date, start_Date, thumbnail } = body;

        let userId = created_By.toString();

        const isExistUser = await this.usersService.findOneById(userId);

        if (!isExistUser) {
            throw new NotFoundException('user not found')
        }

        const isExistProject = await this.projectModel.findById(id);

        if (!isExistProject) {
            throw new NotFoundException('Project not found');
        }

        isExistProject.name = name;
        isExistProject.created_By = created_By;
        isExistProject.thumbnail = thumbnail;
        isExistProject.is_Completed = is_Completed;
        isExistProject.start_Date = start_Date;
        isExistProject.end_Date = end_Date;


        await isExistProject.save();

        return {
            success: true,
            message: `project updated successfully of id ${isExistProject._id}`
        }
    }

    async deleteProject(id: string): Promise<StatusResponse | never> {
        const deletedProject = await this.projectModel.findByIdAndDelete(id);
        if (!deletedProject) {
            return {
                success: false,
                message: 'no such project of given id'
            }
        }
        return {
            success: true,
            message: `project deleted successfully with id ${id}`
        }
    }

}
