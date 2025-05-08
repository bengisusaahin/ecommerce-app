import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cart, CartDocument } from '../schemas/cart.schema';
import { AddToCartDto } from '../dto/add-to-cart.dto';

@Injectable()
export class CartService {
    constructor(
        @InjectModel(Cart.name) private cartModel: Model<CartDocument>,
    ) { }

    async addToCart(dto: AddToCartDto) {
        const cart = await this.cartModel.findOne({ userId: dto.userId });

        if (!cart) {
            return this.cartModel.create({
                userId: dto.userId,
                items: [{
                    productId: dto.productId,
                    name: dto.name,
                    price: dto.price,
                    quantity: dto.quantity,
                }],
            });
        }

        const itemIndex = cart.items.findIndex(
            (item) => item.productId === dto.productId,
        );

        if (itemIndex > -1) {
            cart.items[itemIndex].quantity += dto.quantity;
        } else {
            cart.items.push({
                productId: dto.productId,
                name: dto.name,
                price: dto.price,
                quantity: dto.quantity,
            });
        }

        return cart.save();
    }

    async getCart(userId: string) {
        const cart = await this.cartModel.findOne({ userId });
        if (!cart) {
            throw new NotFoundException('Cart not found');
        }
        return cart;
    }

    async clearCart(userId: string) {
        const result = await this.cartModel.deleteOne({ userId });
        if (result.deletedCount === 0) {
            throw new NotFoundException('Cart not found');
        }
        return { message: 'Cart cleared successfully' };
    }

    async removeFromCart(userId: string, productId: string) {
        const cart = await this.cartModel.findOneAndUpdate(
            { userId },
            { $pull: { items: { productId: String(productId) } } },
            { new: true }
        );

        if (!cart) {
            throw new NotFoundException('Cart not found');
        }

        return cart;
    }

    async updateCart(userId: string, productId: string, quantity: number) {
        const cart = await this.cartModel.findOne({ userId });
        if (!cart) {
            throw new NotFoundException('Cart not found');
        }

        const itemIndex = cart.items.findIndex(
            (item) => item.productId === productId
        );

        if (itemIndex === -1) {
            throw new NotFoundException('Product not found in cart');
        }

        if (quantity <= 0) {
            cart.items.splice(itemIndex, 1);
        } else {
            cart.items[itemIndex].quantity = quantity;
        }

        return cart.save();
    }
}
