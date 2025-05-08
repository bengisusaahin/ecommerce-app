import { Controller, Post, Get, Delete, Body, Param, UseGuards, Request, Put } from '@nestjs/common';
import { CartService } from '../service/cart.service';
import { AddToCartDto } from '../dto/add-to-cart.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { UpdateCartDto } from '../dto/update-cart.dto';

@Controller('cart')
@UseGuards(JwtAuthGuard)
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post('add')
  addToCart(@Request() req, @Body() dto: AddToCartDto) {
    dto.userId = req.user.id;
    return this.cartService.addToCart(dto);
  }

  @Get()
  getCart(@Request() req) {
    return this.cartService.getCart(req.user.id);
  }

  @Delete('clear')
  clearCart(@Request() req) {
    return this.cartService.clearCart(req.user.id);
  }

  @Put('update')
  updateCart(
    @Request() req,
    @Body() dto: UpdateCartDto
  ) {
    return this.cartService.updateCart(req.user.id, dto.productId, dto.quantity);
  }

  @Delete('remove')
  async removeItem(@Request() req, @Body('productId') productId: string) {
    return this.cartService.removeFromCart(req.user.id, productId);
  }
}
