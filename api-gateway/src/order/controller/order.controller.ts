import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, UseGuards, UsePipes, ValidationPipe, Request } from '@nestjs/common';
import { OrderService } from '../service/order.service';
import { CreateOrderDto } from '../dto/create-order.dto';
import { Order } from '../entity/order.entity';
import { UpdateOrderDto } from '../dto/update-order.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UserRole } from 'src/users/utils/types';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { OwnerOrRolesGuard } from 'src/auth/guards/owner-or-roles.guard';

@Controller('orders')
@UseGuards(JwtAuthGuard)
export class OrderController {
    constructor(private readonly ordersService: OrderService) { }

    @Get()
    @UseGuards(OwnerOrRolesGuard)
    @Roles(UserRole.ADMIN)
    getOrders(
        @Request() req,
        @Query('page') page?: number,
        @Query('limit') limit?: number,
        @Query('sort') sort?: string,
        @Query('order') order?: 'asc' | 'desc',
    ): Promise<Order[]> {
        const query = { page, limit, sort, order };
        const userId = req.user.role === UserRole.ADMIN ? undefined : req.user.id;
        if (userId) {
            Object.assign(query, { userId });
        }
        return this.ordersService.findAll(query);
    }

    @Get(':id')
    @UseGuards(OwnerOrRolesGuard)
    @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN)
    getOrderById(@Param('id', ParseIntPipe) id: number): Promise<Order> {
        return this.ordersService.findOne(id);
    }

    @Post()
    @UseGuards(RolesGuard)
    @Roles(UserRole.USER, UserRole.SELLER)
    @UsePipes(new ValidationPipe({ whitelist: true }))
    async asynccreateOrder(@Body() createOrderDto: CreateOrderDto): Promise<Order> {
        try {
            return await this.ordersService.create(createOrderDto);
        } catch (error) {
            throw error;
        }
    }

    @Put(':id')
    @UseGuards(OwnerOrRolesGuard)
    @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN)
    updateOrder(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateOrderDto: UpdateOrderDto,
    ): Promise<Order> {
        return this.ordersService.update(id, updateOrderDto);
    }

    @Delete(':id')
    @UseGuards(RolesGuard)
    @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN)
    deleteOrder(@Param('id', ParseIntPipe) id: number): Promise<{ message: string }> {
        return this.ordersService.remove(id);
    }
}
