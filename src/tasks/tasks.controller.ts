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
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/createTask.dto';
import { UpdateTaskDto } from './dto/updateTask.dto';
import { AuthGuard } from '../auth/auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @Roles('admin', 'manager')
  @UseGuards(AuthGuard, RolesGuard)
  async createTask(@Body() body: CreateTaskDto) {
    try {
      return await this.tasksService.createTask(body);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('/:projectId')
  @Roles('admin', 'manager')
  @UseGuards(AuthGuard, RolesGuard)
  async getAllTaskByProjectId(@Param('projectId') projectId: string) {
    try {
      return await this.tasksService.getAllTaskByProjectId(projectId);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('/:taskId')
  @Roles('admin', 'manager', 'user')
  @UseGuards(AuthGuard, RolesGuard)
  async getById(@Param('taskId') taskId: string) {
    try {
      return await this.tasksService.getTaskById(taskId);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Put('/update/:taskId')
  @Roles('admin', 'manager', 'user')
  @UseGuards(AuthGuard, RolesGuard)
  async update(@Body() body: UpdateTaskDto, @Param('taskId') taskId: string) {
    try {
      return await this.tasksService.updateProject(body, taskId);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete('/delete/:taskId')
  @Roles('admin', 'manager')
  @UseGuards(AuthGuard, RolesGuard)
  async delete(@Param('taskId') taskId: string) {
    try {
      return this.tasksService.deleteProject(taskId);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
