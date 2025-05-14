import { Module } from '@nestjs/common';
import { ProductCommentService } from './service/product-comment.service';
import { ProductCommentController } from './controller/product-comment.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductComment, ProductCommentSchema } from './schemas/product-comment.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ProductComment.name, schema: ProductCommentSchema },
    ]),
  ],

  providers: [ProductCommentService],
  controllers: [ProductCommentController]
})
export class ProductCommentModule {}
