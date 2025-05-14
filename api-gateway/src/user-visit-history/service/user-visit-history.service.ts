import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserVisitHistoryDocument } from '../schema/user-visit-history.schema';
import { Model } from 'mongoose';

@Injectable()
export default class UserVisitHistoryService {
    constructor(
      @InjectModel(UserVisitHistoryService.name)
      private readonly visitModel: Model<UserVisitHistoryDocument>,
    ) {}
  
    async recordVisit(userId: string, productId: string) {
      const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000);
  
      const recentVisit = await this.visitModel.findOne({
        userId,
        productId,
        visitedAt: { $gte: tenMinutesAgo },
      });
  
      if (recentVisit) {
        return;
      }
  
      await this.visitModel.create({ userId, productId });
  
      const count = await this.visitModel.countDocuments({ userId });
      if (count > 100) {
        await this.visitModel
          .find({ userId })
          .sort({ visitedAt: 1 })
          .limit(count - 100)
          .then((oldRecords) => {
            const idsToDelete = oldRecords.map((r) => r._id);
            return this.visitModel.deleteMany({ _id: { $in: idsToDelete } });
          });
      }
    }
  
    async getVisitHistory(userId: string) {
      return this.visitModel.find({ userId }).sort({ visitedAt: -1 }).limit(100);
    }
  }
  
