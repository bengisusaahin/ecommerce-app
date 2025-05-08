import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, UseGuards } from '@nestjs/common';
import { OrderService } from '../service/order.service';
import { CreateOrderDto } from '../dto/create-order.dto';
import { Order } from '../entity/order.entity';
import { UpdateOrderDto } from '../dto/update-order.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('orders')
@UseGuards(JwtAuthGuard)
export class OrderController {
    constructor(private readonly ordersService: OrderService) {}

    @Get() 
    getOrders(
        @Query('page') page?: number,
        @Query('limit') limit?: number,
        @Query('sort') sort?: string,
        @Query('order') order?: 'asc' | 'desc',
    ): Promise<Order[]> {
        return this.ordersService.findAll({ page, limit, sort, order });
    }

    @Get(':id')
    getOrderById(@Param('id', ParseIntPipe) id: number): Promise<Order> {
        return this.ordersService.findOne(id);
    }

    @Post()
    createOrder(@Body() createOrderDto: CreateOrderDto): Promise<Order> {
        return this.ordersService.create(createOrderDto);
    }

    @Put(':id')
    updateOrder(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateOrderDto: UpdateOrderDto,  
    ): Promise<Order> {
        return this.ordersService.update(id, updateOrderDto);  
    }

    @Delete(':id')
    deleteOrder(@Param('id', ParseIntPipe) id: number): Promise<{ message: string }> {
        return this.ordersService.remove(id);
    }
}
