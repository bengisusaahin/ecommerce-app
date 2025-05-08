import { Test, TestingModule } from '@nestjs/testing';
import { UserVisitHistoryController } from './user-visit-history.controller';

describe('UserVisitHistoryController', () => {
  let controller: UserVisitHistoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserVisitHistoryController],
    }).compile();

    controller = module.get<UserVisitHistoryController>(UserVisitHistoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
