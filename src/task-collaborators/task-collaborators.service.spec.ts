import { Test, TestingModule } from '@nestjs/testing';
import { TaskCollaboratorsService } from './task-collaborators.service';

describe('TaskCollaboratorsService', () => {
  let service: TaskCollaboratorsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TaskCollaboratorsService],
    }).compile();

    service = module.get<TaskCollaboratorsService>(TaskCollaboratorsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
