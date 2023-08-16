import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ProjectCollaboratorsService } from './project-collaborators.service';
import { CreateOrUpdateProjectCollaboratorsDto } from './dto/createOrUpdateProjectCollaborators.dto';

@ApiTags('Project Collaborators')
@Controller('project-collaborators')
export class ProjectCollaboratorsController {
  constructor(
    private readonly projectCollaboratorService: ProjectCollaboratorsService,
  ) {}

  @Post(':projectId')
  async addProjectCollaborator(
    @Param('projectId') projectId: string,
    @Body() body: CreateOrUpdateProjectCollaboratorsDto,
  ) {
    try {
      return this.projectCollaboratorService.addProjectCollaborator(
        projectId,
        body,
      );
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get(':projectId')
  async getCollaborators(@Param('projectId') projectId: string) {
    try {
      return await this.projectCollaboratorService.getCollaborators(projectId);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':projectId/:collaboratorId')
  async removeCollaborator(
    @Param('projectId') projectId: string,
    @Param('collaboratorId') collaboratorId: string,
  ) {
    try {
      return await this.projectCollaboratorService.removeCollaborator(
        projectId,
        collaboratorId,
      );
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
