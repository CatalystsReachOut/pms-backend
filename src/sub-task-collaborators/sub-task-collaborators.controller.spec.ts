import { Test, TestingModule } from '@nestjs/testing';
import { SubTaskCollaboratorsController } from './sub-task-collaborators.controller';

describe('SubTaskCollaboratorsController', () => {
  let controller: SubTaskCollaboratorsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SubTaskCollaboratorsController],
    }).compile();

    controller = module.get<SubTaskCollaboratorsController>(SubTaskCollaboratorsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
