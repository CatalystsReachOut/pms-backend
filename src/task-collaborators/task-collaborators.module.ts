import { Module } from '@nestjs/common';
import { TaskCollaboratorsController } from './task-collaborators.controller';
import { TaskCollaboratorsService } from './task-collaborators.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TaskCollaboratorSchema } from './task-collaborators.schema';
import { AuthModule } from '../auth/auth.module';
import { UsersModule } from '../users/users.module';
import { TasksModule } from '../tasks/tasks.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'TaskCollaborator', schema: TaskCollaboratorSchema },
    ]),
    AuthModule,
    UsersModule,
    TasksModule,
  ],
  controllers: [TaskCollaboratorsController],
  providers: [TaskCollaboratorsService],
  exports: [TaskCollaboratorsService],
})
export class TaskCollaboratorsModule {}
