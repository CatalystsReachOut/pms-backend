import { Module } from '@nestjs/common';
import { SubTaskCollaboratorsController } from './sub-task-collaborators.controller';
import { SubTaskCollaboratorsService } from './sub-task-collaborators.service';
import { MongooseModule } from '@nestjs/mongoose';
import { SubTaskCollaboratorSchema } from './sub-task-collaborators.schema';
import { AuthModule } from '../auth/auth.module';
import { UsersModule } from '../users/users.module';
import { SubtasksModule } from '../subtasks/subtasks.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'SubTaskCollaborator', schema: SubTaskCollaboratorSchema }]),
    AuthModule,
    UsersModule,
    SubtasksModule,
  ],
  controllers: [SubTaskCollaboratorsController],
  providers: [SubTaskCollaboratorsService],
  exports: [SubTaskCollaboratorsService]
})
export class SubTaskCollaboratorsModule {}
