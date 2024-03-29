import { Module, ValidationError, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { AllExceptionFilter } from './filters/all-exception.filter';
import { NormalExceptionFilter } from './filters/normal-exception.filter';
import { ValidationExceptionFilter } from './filters/validator-exception.filter';
import { ResponseInterceptor } from './interceptor/response.interceptor';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { OtpModule } from './otp/otp.module';
import { ProjectsModule } from './projects/projects.module';
import { StatusesModule } from './statuses/statuses.module';
import { PrioritiesModule } from './priorities/priorities.module';
import { TasksModule } from './tasks/tasks.module';
import { SubtasksModule } from './subtasks/subtasks.module';
import { ProjectCollaboratorsModule } from './project-collaborators/project-collaborators.module';
import { TaskCollaboratorsModule } from './task-collaborators/task-collaborators.module';
import { SubTaskCollaboratorsModule } from './sub-task-collaborators/sub-task-collaborators.module';

@Module({
  imports: [
    DatabaseModule,
    AuthModule,
    UsersModule,
    OtpModule,
    ProjectsModule,
    StatusesModule,
    PrioritiesModule,
    TasksModule,
    SubtasksModule,
    ProjectCollaboratorsModule,
    TaskCollaboratorsModule,
    SubTaskCollaboratorsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: AllExceptionFilter,
    },
    {
      provide: APP_FILTER,
      useClass: NormalExceptionFilter,
    },
    {
      provide: APP_FILTER,
      useClass: ValidationExceptionFilter,
    },
    {
      // Allowing to do validation through DTO
      // Since class-validator library default throw BadRequestException, here we use exceptionFactory to throw
      // their internal exception so that filter can recognize it
      provide: APP_PIPE,
      useFactory: () =>
        new ValidationPipe({
          exceptionFactory: (errors: ValidationError[]) => {
            return errors;
          },
        }),
    },
    { provide: APP_INTERCEPTOR, useClass: ResponseInterceptor },
  ],
})
export class AppModule { }
