import { Controller, Post, Get, Delete, Body, Param, UseGuards, Req } from '@nestjs/common';
import { ProductCommentService } from '../service/product-comment.service';
import { ProductCommentDto } from '../dto/product-comment.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';

@Controller('comments')
@UseGuards(JwtAuthGuard)
export class ProductCommentController {
    constructor(private readonly commentService: ProductCommentService) { }

    @Post()
    async create(@Req() req, @Body() dto: ProductCommentDto) {
        return this.commentService.createComment(req.user.id, dto);
    }

    @Delete(':commentId')
    async deleteOwnComment(@Req() req, @Param('commentId') commentId: string) {
        return this.commentService.deleteOwnComment(req.user.id, commentId);
    }

    @Get('product/:productId')
    async getComments(@Param('productId') productId: string) {
        return this.commentService.getCommentsByProduct(productId);
    }

    @Get('product/:productId/average-rating')
    async getAverageRating(@Param('productId') productId: string) {
        return this.commentService.getAverageRating(productId);
    }
}
