import { Inject, Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Repository } from 'typeorm';
import { OrderItem } from './entities/order-item.entity';
import { plainToInstance } from 'class-transformer';
import { MICROSERVICES, ORDER_KAFKA_EVENTS, OrderCreatedEvent, PaginatedResult, PaginationParams, SortOrder } from '@ecommerce/types';
import { ClientKafka } from '@nestjs/microservices';
import { CreateOrderDto, OrderResponseDto, UpdateOrderDto } from '@ecommerce/types';

@Injectable()
export class OrdersService implements OnModuleInit {

  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,

    @InjectRepository(OrderItem)
    private readonly orderItemRepository: Repository<OrderItem>,

    @Inject(`${MICROSERVICES.KAFKA.name}`) private readonly kafkaClient: ClientKafka,
  ) { }

  onModuleInit() {
    this.kafkaClient.connect();
  }

  async create(dto: CreateOrderDto): Promise<OrderResponseDto> {
    const order = this.orderRepository.create({
      userId: dto.userId,
      totalPrice: dto.totalPrice,
    });
    const savedOrder = await this.orderRepository.save(order);

    const orderItems = dto.orderItems.map((item) =>
      this.orderItemRepository.create({
        order: savedOrder,
        productId: item.productId,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
        totalPrice: item.totalPrice,
      }),
    );

    const savedItems = await this.orderItemRepository.save(orderItems);

    const orderPayload: OrderCreatedEvent = {
      orderId: order.id,
      userId: order.userId,
      createdAt: new Date().toISOString(),
      items: dto.orderItems.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
      })),
      totalPrice: order.totalPrice,
    };

    this.kafkaClient.emit(ORDER_KAFKA_EVENTS.ORDER_CREATED, orderPayload);

    return plainToInstance(
      OrderResponseDto,
      {
        id: savedOrder.id,
        userId: savedOrder.userId,
        totalPrice: savedOrder.totalPrice,
        items: savedItems,
      },
      { excludeExtraneousValues: true },
    );
  }

  async findAll(
    params: PaginationParams = {} as PaginationParams,
  ): Promise<PaginatedResult<OrderResponseDto>> {
    const page = Number(params.page) || 1;
    const limit = Number(params.limit) || 10;
    const sort = params.sort || 'id';
    const order = (params.order || 'ASC').toUpperCase() as SortOrder;
    const [orders, total] = await this.orderRepository.findAndCount({
      relations: ['items'],
      skip: (page - 1) * limit,
      take: limit,
      order: { [sort]: order },
    });
    return {
      data: plainToInstance(OrderResponseDto, orders, {
        excludeExtraneousValues: true,
      }),
      total,
      page,
      limit,
    };
  }

  async findOne(id: number): Promise<OrderResponseDto> {
    const order = await this.orderRepository.findOne({
      where: { id },
      relations: ['items'],
    });
    if (!order) throw new NotFoundException(`Order ${id} not found`);
    return plainToInstance(OrderResponseDto, order, {
      excludeExtraneousValues: true,
    });
  }

  async update(id: number, dto: UpdateOrderDto): Promise<OrderResponseDto> {
    const order = await this.orderRepository.findOne({
      where: { id },
      relations: ['items'],
    });
    if (!order) throw new NotFoundException(`Order ${id} not found`);

    if (dto.totalPrice) order.totalPrice = dto.totalPrice;

    if (dto.orderItems) {
      await this.orderItemRepository.remove(order.items);
      const newItems = dto.orderItems.map((item) =>
        this.orderItemRepository.create({
          order,
          productId: item.productId,
          quantity: item.quantity,
          unitPrice: item.unitPrice,
          totalPrice: item.totalPrice,
        }),
      );
      order.items = await this.orderItemRepository.save(newItems);
    }

    const updated = await this.orderRepository.save(order);
    const result = await this.orderRepository.findOne({
      where: { id: updated.id },
      relations: ['items'],
    });

    return plainToInstance(OrderResponseDto, result, {
      excludeExtraneousValues: true,
    });
  }

  async remove(id: number): Promise<{ message: string }> {
    const deleted = await this.orderRepository.delete(id);
    if (deleted.affected === 0)
      throw new NotFoundException(`Order ${id} not found`);
    return { message: `Order ${id} deleted successfully` };
  }
}
