import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, UseGuards } from '@nestjs/common';
import { OrderService } from '../service/order.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { UserRole } from 'src/products/utils/types';
import { CreateOrderDto, PaginationParams, UpdateOrderDto } from '@ecommerce/types';

@Controller('orders')
@UseGuards(JwtAuthGuard)
export class OrderController {
    constructor(private readonly ordersService: OrderService) { }

    @Post()
    @UseGuards( RolesGuard)
    @Roles(UserRole.USER, UserRole.SELLER)
    create(@Body() dto: CreateOrderDto) {
        return this.ordersService.create(dto);
    }

    @Get()
    findAll(@Query() query: PaginationParams) {
        return this.ordersService.findAll(query);
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.ordersService.findOne(id);
    }

    @Put(':id')
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: UpdateOrderDto,
    ) {
        return this.ordersService.update(id, dto);
    }

    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.ordersService.remove(id);
    }
}
