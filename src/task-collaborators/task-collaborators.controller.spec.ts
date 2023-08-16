import { Test, TestingModule } from '@nestjs/testing';
import { TaskCollaboratorsController } from './task-collaborators.controller';

describe('TaskCollaboratorsController', () => {
  let controller: TaskCollaboratorsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TaskCollaboratorsController],
    }).compile();

    controller = module.get<TaskCollaboratorsController>(TaskCollaboratorsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
