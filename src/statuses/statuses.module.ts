import { Module } from '@nestjs/common';
import { StatusesController } from './statuses.controller';
import { StatusesService } from './statuses.service';
import { MongooseModule } from '@nestjs/mongoose';
import { StatusSchema } from './statuses.schema';

@Module({
  imports:[
    MongooseModule.forFeature([{ name: 'Status', schema: StatusSchema }])
  ],
  controllers: [StatusesController],
  providers: [StatusesService]
})
export class StatusesModule {}
