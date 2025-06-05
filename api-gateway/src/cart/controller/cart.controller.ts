import { Controller, Post, Get, Delete, Body, Param, UseGuards, Request, Put, UsePipes, ValidationPipe, Req, Query } from '@nestjs/common';
import { CartService } from '../service/cart.service';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { CreateCartDto, UpdateCartDto } from '@ecommerce/types';

@Controller('cart')
@UseGuards(JwtAuthGuard)
export class CartController {
  constructor(private readonly cartService: CartService) { }

  @Post('add')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  addToCart(@Body() dto: CreateCartDto, @Req() req) {
    dto.userId = req.user.sub;
    return this.cartService.addToCart(dto);
  }

  @Get()
  getCart(@Req() req) {
    return this.cartService.getCart(req.user.sub);
  }

  @Delete('clear')
  clearCart(@Req() req) {
    return this.cartService.clearCart(req.user.sub);
  }

  @Put('update')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  updateCart(@Request() req, @Body() dto: UpdateCartDto) {
    dto.userId = req.user.sub;
    return this.cartService.updateCart(dto);
  }

  @Delete('remove')
  removeItem(@Req() req, @Query('productId') productId: string) {
    return this.cartService.removeItem({
      userId: req.user.sub,
      productId,
    });
  }
}
