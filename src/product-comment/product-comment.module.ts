import { Module } from '@nestjs/common';
import { ProductCommentService } from './product-comment.service';
import { ProductCommentController } from './product-comment.controller';

@Module({
  providers: [ProductCommentService],
  controllers: [ProductCommentController]
})
export class ProductCommentModule {}
