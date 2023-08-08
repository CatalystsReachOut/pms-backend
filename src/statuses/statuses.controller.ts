import { Body, Controller, Delete, Get, HttpException, HttpStatus, Injectable, Param, Post, Put } from '@nestjs/common';
import { StatusesService } from './statuses.service';
import { CreateOrUpdateStatusDto } from './dto/createStatus.dto';
import { ApiTags } from '@nestjs/swagger';

@Injectable()
@ApiTags('Status')
@Controller('statuses')
export class StatusesController {
    constructor(private readonly statusService: StatusesService) { }

    @Post('add')
    async createStatus(@Body() body: CreateOrUpdateStatusDto){
      try {
        return await this.statusService.createStatus(body);
      } catch (error) {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }
    }

    @Put('/update/:statusId')
    async updateStatus(@Param('statusId') statusId: string, @Body() body:CreateOrUpdateStatusDto) {
      try {
        return await this.statusService.updateStatus(statusId,body );
      } catch (error) {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }
    }

    @Delete('/delete/:statusId')
    async deleteStatus(@Param('statusId') statusId: string) {
      try {
        return await this.statusService.deleteStatus(statusId, );
      } catch (error) {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }
    }

    @Get()
    async findAll() {
      try {
        return await this.statusService.findAll();
      } catch (error) {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }
    }

    @Get('/:statusId')
    async findOneById(@Param('statusId') statusId: string) {
      try {
        return await this.statusService.findOneById(statusId);
      } catch (error) {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }
    }
}
