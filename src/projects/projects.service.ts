import { Injectable, NotFoundException } from '@nestjs/common';
import { ProjectDto, UpdateProjectDto } from './dto/projects.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Project } from './projects.schema';
import { UsersService } from '../users/users.service';

@Injectable()
export class ProjectsService {

    constructor(@InjectModel('Project') private readonly projectModel: Model<Project>,
        private readonly usersService: UsersService) { }

    async create(body: ProjectDto): Promise<Project | null> {
        const { name, created_By, thumbnail } = body;

        // changing objectid type of createdby into string
        const userId = created_By.toString();
        const isExistUser = await this.usersService.findOneById(userId);
        if (!isExistUser) {
            throw new NotFoundException('user not found')
        }
        const newProject = await this.projectModel.create(
            {
                name: name,
                created_By,
                thumbnail
            }
        );

        return newProject
    }

    async getAllProject(): Promise<Project[]> {
        return this.projectModel.find({});
    }

    async getProjectById(id: string): Promise<Project>{
        const isExistProject = this.projectModel.findById(id);

        if(!isExistProject){
            throw new NotFoundException('Project not found');
        }

        return isExistProject;
    }

    async updateProject(body: UpdateProjectDto,id:string){

    }

}
