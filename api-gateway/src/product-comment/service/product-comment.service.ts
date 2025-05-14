import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProductComment, ProductCommentDocument } from '../schemas/product-comment.schema';
import { ProductCommentDto } from '../dto/product-comment.dto';

@Injectable()
export class ProductCommentService {
    constructor(
        @InjectModel(ProductComment.name)
        private readonly commentModel: Model<ProductCommentDocument>,
    ) { }

    async createComment(userId: string, dto: ProductCommentDto) {
        return this.commentModel.create({
            userId,
            ...dto,
        });
    }

    async deleteOwnComment(userId: string, commentId: string) {
        const deleted = await this.commentModel.findOneAndDelete({
            _id: commentId,
            userId,
        }).exec();

        if (!deleted) {
            throw new NotFoundException('Comment not found or not owned by user');
        }

        return deleted;
    }

    async getCommentsByProduct(productId: string) {
        return this.commentModel
            .find({ productId: String(productId) })
            .sort({ createdAt: -1 })
            .exec();
    }

    async getAverageRating(productId: string) {
        const result = await this.commentModel.aggregate([
            { $match: { productId: String(productId) } },
            {
                $group: {
                    _id: '$productId',
                    averageRating: { $avg: '$rating' },
                    count: { $sum: 1 },
                },
            },
        ]).exec();

        return {
            productId,
            averageRating: result[0]?.averageRating || 0,
            totalComments: result[0]?.count || 0,
        };
    }
}