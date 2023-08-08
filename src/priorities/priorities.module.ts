import { Module } from '@nestjs/common';
import { PrioritiesController } from './priorities.controller';
import { PrioritiesService } from './priorities.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PrioritySchema } from './priorities.schema';

@Module({
  imports:[
    MongooseModule.forFeature([{ name: 'Priority', schema: PrioritySchema }])
  ],
  controllers: [PrioritiesController],
  providers: [PrioritiesService]
})
export class PrioritiesModule {}
