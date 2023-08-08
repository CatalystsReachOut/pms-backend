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
import { PrioritiesService } from './priorities.service';
import { CreateOrUpdatePriorityDto } from './dto/createOrUpdatePriority.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Priority')
@Controller('priorities')
export class PrioritiesController {
  constructor(private readonly priorityService: PrioritiesService) {}

  @Post('add')
  async createStatus(@Body() body: CreateOrUpdatePriorityDto) {
    try {
      return await this.priorityService.createPriority(body);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Put('/update/:priorityId')
  async updateStatus(
    @Param('priorityId') priorityId: string,
    @Body() body: CreateOrUpdatePriorityDto,
  ) {
    try {
      return await this.priorityService.updatePriority(priorityId, body);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete('/delete/:priorityId')
  async deleteStatus(@Param('priorityId') priorityId: string) {
    try {
      return await this.priorityService.deletePriority(priorityId);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  async findAll() {
    try {
      return await this.priorityService.findAll();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('/:priorityId')
  async findOneById(@Param('priorityId') priorityId: string) {
    try {
      return await this.priorityService.findOneById(priorityId);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
