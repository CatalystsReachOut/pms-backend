import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post } from '@nestjs/common';
import { TaskCollaboratorsService } from './task-collaborators.service';
import { CreateOrUpdateTaskCollaboratorsDto } from './dto/createOrUpdateTaskCollaborators.dto';

@Controller('task-collaborators')
export class TaskCollaboratorsController {
    constructor(
        private readonly taskCollaboratorsService: TaskCollaboratorsService,
      ) {}
    
      @Post(':taskId')
      async addTaskCollaborator(
        @Param('taskId') taskId: string,
        @Body() body: CreateOrUpdateTaskCollaboratorsDto,
      ) {
        try {
          return this.taskCollaboratorsService.addTaskCollaborator(
            taskId,
            body,
          );
        } catch (error) {
          throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
      }
    
      @Get(':taskId')
      async getCollaborators(@Param('taskId') taskId: string) {
        try {
          return await this.taskCollaboratorsService.getCollaborators(taskId);
        } catch (error) {
          throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
      }
    
      @Delete(':taskId/:collaboratorId')
      async removeCollaborator(
        @Param('taskId') taskId: string,
        @Param('collaboratorId') collaboratorId: string,
      ) {
        try {
          return await this.taskCollaboratorsService.removeCollaborator(
            taskId,
            collaboratorId,
          );
        } catch (error) {
          throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
      }
}
