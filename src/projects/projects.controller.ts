import { Controller, Get, Post, HttpException, HttpStatus, UseGuards, Body, Param, Put, Delete } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { AuthGuard } from '../auth/auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { ProjectDto, UpdateProjectDto } from './dto/projects.dto';
import { ProjectResponse } from 'src/interfaces';

@Controller('projects')
export class ProjectsController {
    constructor(private readonly projectsService: ProjectsService) { }

    @Post()
    // @Roles('admin')
    // @UseGuards(AuthGuard, RolesGuard)
    async createProject(@Body() body: ProjectDto): Promise<ProjectResponse | never> {
        try {
            return await this.projectsService.createProject(body)
        }
        catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST)
        }
    }

    @Get()
    // @Roles('admin')
    // @UseGuards(AuthGuard)
    async getAll(): Promise<ProjectResponse | never> {
        try {
            return await this.projectsService.getAllProject();
        }
        catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST)
        }
    }

    @Get('/:projectId')
    // @Roles('admin')
    // @UseGuards(AuthGuard)
    async getById(@Param('projectId') projectId: string): Promise<ProjectResponse | never> {
        try {
            return await this.projectsService.getProjectById(projectId)
        }
        catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST)
        }
    }

    @Put('/update/:projectId')
    // @Roles('admin')
    // @UseGuards(AuthGuard)
    async update(@Body() body: UpdateProjectDto, @Param('projectId') projectId: string): Promise<ProjectResponse | never> {
        try {
            return await this.projectsService.updateProject(body, projectId)
        }
        catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST)
        }
    }

    @Delete('/delete/:projectId')
    // @Roles('admin')
    // @UseGuards(AuthGuard)
    async delete(@Param('projectId') projectId: string): Promise<ProjectResponse | never> {
        try {
            return this.projectsService.deleteProject(projectId);
        }
        catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST)
        }
    }

}
