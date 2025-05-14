import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserVisitHistoryController } from './controller/user-visit-history.controller';
import UserVisitHistoryService from './service/user-visit-history.service';
import { UserVisitHistorySchema } from './schema/user-visit-history.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UserVisitHistoryService.name, schema: UserVisitHistorySchema },
    ]),
  ],

  providers: [UserVisitHistoryService],
  controllers: [UserVisitHistoryController],
  exports: [UserVisitHistoryService]
})
export class UserVisitHistoryModule {}
