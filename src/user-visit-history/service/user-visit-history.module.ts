import { Module } from '@nestjs/common';
import { UserVisitHistoryService } from '../user-visit-history.service';
import { UserVisitHistoryController } from '../controller/user-visit-history.controller';

@Module({
  providers: [UserVisitHistoryService],
  controllers: [UserVisitHistoryController]
})
export class UserVisitHistoryModule {}
