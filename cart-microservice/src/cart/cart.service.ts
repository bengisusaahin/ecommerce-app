import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cart, CartDocument } from './schema/cart.schema';
import { CreateCartDto } from '@ecommerce/types';

@Injectable()
export class CartService {
  constructor(
    @InjectModel(Cart.name)
    private readonly cartModel: Model<CartDocument>,
  ) { }

  async getCart(userId: string) {
    const cart = await this.cartModel.findOne({ userId });
    if (!cart) throw new NotFoundException('Cart not found');
    return cart;
  }

  async addToCart(createCartDto: CreateCartDto) {
    const cart = await this.cartModel.findOne({ userId: createCartDto.userId });

    if (!cart) {
      return this.cartModel.create({
        userId: createCartDto.userId,
        items: [
          {
            productId: createCartDto.productId,
            name: createCartDto.name,
            price: createCartDto.price,
            quantity: createCartDto.quantity,
          },
        ],
      });
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.productId === createCartDto.productId,
    );
    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += createCartDto.quantity;
    } else {
      cart.items.push({
        productId: createCartDto.productId,
        name: createCartDto.name,
        price: createCartDto.price,
        quantity: createCartDto.quantity,
      });
    }

    return cart.save();
  }

  async updateCart(userId: string, productId: string, quantity: number) {
    const cart = await this.cartModel.findOne({ userId });
    if (!cart) throw new NotFoundException('Cart not found');

    const item = cart.items.find((i) => i.productId === productId);
    if (!item) throw new NotFoundException('Item not found');

    item.quantity = quantity;
    return cart.save();
  }

  async clearCart(userId: string) {
    return this.cartModel.deleteOne({ userId });
  }

  async removeItem(userId: string, productId: string) {
    return this.cartModel.findOneAndUpdate(
      { userId },
      { $pull: { items: { productId } } },
      { new: true },
    );
  }
}
