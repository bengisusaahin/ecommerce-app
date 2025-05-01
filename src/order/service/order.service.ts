import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from '../entity/order.entity';
import { Repository } from 'typeorm';
import { OrderItem } from '../entity/order-item.entity';
import { CreateOrderDto } from '../dto/create-order.dto';
import { User } from 'src/users/entity/user.entity';
import { Product } from 'src/products/entity/product.entity';
import { UpdateOrderDto } from '../dto/update-order.dto';

@Injectable()
export class OrderService {
    constructor(
        @InjectRepository(Order)
        private readonly orderRepository: Repository<Order>,

        @InjectRepository(OrderItem)
        private readonly orderItemRepository: Repository<OrderItem>,

        @InjectRepository(User)
        private userRepository: Repository<User>,

        @InjectRepository(Product)
        private productRepository: Repository<Product>,
    ) { }

    async findAll(query: { page?: number, limit?: number, sort?: string, order?: 'asc' | 'desc' }): Promise<Order[]> {
        const { page = 1, limit = 10, sort = 'id', order = 'asc' } = query;

        const [orders, total] = await this.orderRepository.findAndCount({
            order: { [sort]: order.toUpperCase() as 'ASC' | 'DESC' },
            skip: (page - 1) * limit,
            take: limit,
            relations: ['orderItems', 'orderItems.product', 'user'],
        });

        return orders;
    }

    async findOne(id: number): Promise<Order> {
        const order = await this.orderRepository.findOne({
            where: { id },
            relations: ['orderItems', 'orderItems.product', 'user'],
        });

        if (!order) {
            throw new NotFoundException(`Order with ID ${id} not found`);
        }

        return order;
    }

    async create(createOrderDto: CreateOrderDto): Promise<Order> {
        const user = await this.userRepository.findOne({ where: { id: createOrderDto.userId } });
        if (!user) {
            throw new NotFoundException('User not found');
        }

        const order = this.orderRepository.create({
            user,
            totalPrice: createOrderDto.totalPrice,
        });
        const savedOrder = await this.orderRepository.save(order);

        const orderItems = await Promise.all(
            createOrderDto.orderItems.map(async (item) => {
                const product = await this.productRepository.findOne({ where: { id: item.productId } });
                if (!product) {
                    throw new NotFoundException(`Product with ID ${item.productId} not found`);
                }

                const orderItem = this.orderItemRepository.create({
                    order: savedOrder,
                    product,
                    quantity: item.quantity,
                    price: item.unitPrice,
                    totalPrice: item.totalPrice,
                });

                return this.orderItemRepository.save(orderItem);
            }),
        );

        savedOrder.orderItems = orderItems;
        return savedOrder;
    }

    async update(id: number, updateOrderDto: UpdateOrderDto): Promise<Order> {
        const order = await this.findOne(id);
        Object.assign(order, updateOrderDto);
        return this.orderRepository.save(order);
    }


    async remove(id: number): Promise<{ message: string }> {
        const result = await this.orderRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`Order with ID ${id} not found`);
        }

        return { message: `Order with ID ${id} deleted successfully` };
    }
}
