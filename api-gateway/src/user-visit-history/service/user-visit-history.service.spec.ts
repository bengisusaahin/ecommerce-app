import { Test, TestingModule } from '@nestjs/testing';
import { UserVisitHistoryService } from '../user-visit-history.service';

describe('UserVisitHistoryService', () => {
  let service: UserVisitHistoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserVisitHistoryService],
    }).compile();

    service = module.get<UserVisitHistoryService>(UserVisitHistoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
