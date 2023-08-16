import {
  Body,
  Controller,
  Delete,
  Get,
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
    return this.projectCollaboratorService.addProjectCollaborator(
      projectId,
      body,
    );
  }

  @Get(':projectId')
  async getCollaborators(@Param('projectId') projectId: string) {      
    return await this.projectCollaboratorService.getCollaborators(projectId);;
  }

  @Delete(':projectId/:collaboratorId')
  async removeCollaborator(
    @Param('projectId') projectId: string,
    @Param('collaboratorId') collaboratorId: string,
  ) {
    return await this.projectCollaboratorService.removeCollaborator(
      projectId,
      collaboratorId,
    );
  }
}
