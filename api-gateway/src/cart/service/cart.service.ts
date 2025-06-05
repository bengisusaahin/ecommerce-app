import { CART_PATTERNS, CreateCartDto, UpdateCartDto } from '@ecommerce/types';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class CartService {
    constructor(
        @Inject('CART_MICROSERVICE')
        private readonly cartMicroservice: ClientProxy,
    ) { }

    addToCart(dto: CreateCartDto) {
        return this.cartMicroservice.send({ cmd: CART_PATTERNS.AddToCart }, dto);
    }

    getCart(userId: string) {
        return this.cartMicroservice.send({ cmd: CART_PATTERNS.GetCart }, userId);
    }

    updateCart(dto: UpdateCartDto) {
        return this.cartMicroservice.send({ cmd: CART_PATTERNS.UpdateCart }, dto);
    }

    removeItem(data: { userId: string; productId: string }) {
        return this.cartMicroservice.send(
            { cmd: CART_PATTERNS.RemoveItem },
            { data },
        );
    }

    clearCart(userId: string) {
        return this.cartMicroservice.send({ cmd: CART_PATTERNS.ClearCart }, userId);
    }
}
