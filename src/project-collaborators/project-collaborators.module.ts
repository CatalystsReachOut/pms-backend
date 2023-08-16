import { Module } from '@nestjs/common';
import { ProjectCollaboratorsController } from './project-collaborators.controller';
import { ProjectCollaboratorsService } from './project-collaborators.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProjectCollaboratorSchema } from './project-collaborators.schema';
import { UsersModule } from '../users/users.module';
import { AuthModule } from '../auth/auth.module';

import { ProjectsModule } from '../projects/projects.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'ProjectCollaborator', schema: ProjectCollaboratorSchema },
    ]),
    UsersModule,
    AuthModule,
    ProjectsModule
  ],
  controllers: [ProjectCollaboratorsController],
  providers: [ProjectCollaboratorsService],
  exports: [ProjectCollaboratorsService]
})
export class ProjectCollaboratorsModule {}
