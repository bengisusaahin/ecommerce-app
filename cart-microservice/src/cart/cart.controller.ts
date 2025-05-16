import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { CART_PATTERNS } from './utils/types';

@Controller()
export class CartController {
  constructor(private readonly cartService: CartService) { }

  @MessagePattern({ cmd: CART_PATTERNS.GetCart })
  getCart(@Payload() userId: string) {
    return this.cartService.getCart(userId);
  }

  @MessagePattern({ cmd: CART_PATTERNS.AddToCart })
  addToCart(@Payload() dto: CreateCartDto) {
    return this.cartService.addToCart(dto);
  }

  @MessagePattern({ cmd: CART_PATTERNS.UpdateCart })
  updateCartItem(
    @Payload() data: { userId: string; productId: string; quantity: number },
  ) {
    return this.cartService.updateCart(
      data.userId,
      data.productId,
      data.quantity,
    );
  }

  @MessagePattern({ cmd: CART_PATTERNS.ClearCart })
  clearCart(@Payload() userId: string) {
    return this.cartService.clearCart(userId);
  }

  @MessagePattern({ cmd: CART_PATTERNS.RemoveItem })
  removeItem(@Payload() data: { userId: string; productId: string }) {
    return this.cartService.removeItem(data.userId, data.productId);
  }

}
