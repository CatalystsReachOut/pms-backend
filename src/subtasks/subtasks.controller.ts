import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';

import { ApiTags } from '@nestjs/swagger';
import { SubtasksService } from './subtasks.service';
import { AuthGuard } from '../auth/auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { CreateSubTaskDto } from './dto/createSubTask.dto';
import { UpdateSubTaskDto } from './dto/updateSubTask.dto';

@ApiTags('SubTask')
@Controller('subtasks')
export class SubtasksController {
  constructor(private readonly subTasksService: SubtasksService) {}

  @Post()
  @Roles('admin', 'manager')
  @UseGuards(AuthGuard, RolesGuard)
  async createSubTask(@Body() body: CreateSubTaskDto) {
    try {
      return await this.subTasksService.createSubTask(body);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  // @Get('/:projectId')
  // @Roles('admin', 'manager')
  // @UseGuards(AuthGuard, RolesGuard)
  // async getAllTaskByProjectId(@Param('projectId') projectId: string) {
  //   try {
  //     return await this.subTasksService.getAllTaskByProjectId(projectId);
  //   } catch (error) {
  //     throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
  //   }
  // }

  @Get('/:subTaskId')
  @Roles('admin', 'manager', 'user')
  @UseGuards(AuthGuard, RolesGuard)
  async getSubTaskById(@Param('subTaskId') subTaskId: string) {
    try {
      return await this.subTasksService.getSubTaskById(subTaskId);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Put('/update/:subTaskId')
  @Roles('admin', 'manager', 'user')
  @UseGuards(AuthGuard, RolesGuard)
  async updateSubTask(
    @Body() body: UpdateSubTaskDto,
    @Param('subTaskId') subTaskId: string,
  ) {
    try {
      return await this.subTasksService.updateSubTask(body, subTaskId);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete('/delete/:subTaskId')
  @Roles('admin', 'manager')
  @UseGuards(AuthGuard, RolesGuard)
  async deleteSubTask(@Param('subTaskId') subTaskId: string) {
    try {
      return this.subTasksService.deleteSubTask(subTaskId);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
