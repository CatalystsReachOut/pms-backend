import { Test, TestingModule } from '@nestjs/testing';
import { SubTaskCollaboratorsService } from './sub-task-collaborators.service';

describe('SubTaskCollaboratorsService', () => {
  let service: SubTaskCollaboratorsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SubTaskCollaboratorsService],
    }).compile();

    service = module.get<SubTaskCollaboratorsService>(SubTaskCollaboratorsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
