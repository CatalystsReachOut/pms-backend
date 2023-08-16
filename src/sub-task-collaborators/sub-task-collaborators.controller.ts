import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { SubTaskCollaboratorsService } from './sub-task-collaborators.service';
import { CreateOrUpdateSubTaskCollaborators } from './dto/createOrUpdateSubTaskCollaborators.dto';

@Controller('sub-task-collaborators')
export class SubTaskCollaboratorsController {
  constructor(
    private readonly subTaskCollaboratorsService: SubTaskCollaboratorsService,
  ) {}

  @Post(':subTaskId')
  async addTaskCollaborator(
    @Param('subTaskId') subTaskId: string,
    @Body() body: CreateOrUpdateSubTaskCollaborators,
  ) {
    try {
      return this.subTaskCollaboratorsService.addSubTaskCollaborator(
        subTaskId,
        body,
      );
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get(':subTaskId')
  async getCollaborators(@Param('subTaskId') subTaskId: string) {
    try {
      return await this.subTaskCollaboratorsService.getCollaborators(subTaskId);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':subTaskId/:collaboratorId')
  async removeCollaborator(
    @Param('taskId') subTaskId: string,
    @Param('collaboratorId') collaboratorId: string,
  ) {
    try {
      return await this.subTaskCollaboratorsService.removeCollaborator(
        subTaskId,
        collaboratorId,
      );
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
