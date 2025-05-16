import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { AddToCartDto } from '../dto/add-to-cart.dto';
import { ClientProxy } from '@nestjs/microservices';
import { CART_PATTERNS } from '../utils/types';
import { UpdateCartDto } from '../dto/update-cart.dto';

@Injectable()
export class CartService {
    constructor(
        @Inject('CART_MICROSERVICE')
        private readonly cartMicroservice: ClientProxy,
    ) { }

    addToCart(dto: AddToCartDto) {
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
