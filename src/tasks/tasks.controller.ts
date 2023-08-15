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
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/createTask.dto';
import { UpdateTaskDto } from './dto/updateTask.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  async createTask(@Body() body: CreateTaskDto) {
    try {
      return await this.tasksService.createTask(body);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('/:projectId')
  // @Roles('admin')
  // @UseGuards(AuthGuard)
  async getAllTaskByProjectId(@Param('projectId') projectId: string) {
    try {
      return await this.tasksService.getAllTaskByProjectId(projectId);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('/:taskId')
  // @Roles('admin')
  // @UseGuards(AuthGuard)
  async getById(@Param('taskId') taskId: string) {
    try {
      return await this.tasksService.getTaskById(taskId);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Put('/update/:taskId')
  // @Roles('admin')
  // @UseGuards(AuthGuard)
  async update(@Body() body: UpdateTaskDto, @Param('taskId') taskId: string) {
    try {
      return await this.tasksService.updateProject(body, taskId);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete('/delete/:taskId')
  // @Roles('admin')
  // @UseGuards(AuthGuard)
  async delete(@Param('taskId') taskId: string) {
    try {
      return this.tasksService.deleteProject(taskId);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
