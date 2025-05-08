import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserVisitHistory, UserVisitHistorySchema } from './schema/user-visit-history.schema';
import { UserVisitHistoryService } from './service/user-visit-history.service';
import { UserVisitHistoryController } from './controller/user-visit-history.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UserVisitHistory.name, schema: UserVisitHistorySchema },
    ]),
  ],

  providers: [UserVisitHistoryService],
  controllers: [UserVisitHistoryController]
})
export class UserVisitHistoryModule {}
