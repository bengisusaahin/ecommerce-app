import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, UseGuards } from '@nestjs/common';
import { OrderService } from '../service/order.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { CreateOrderDto, PaginationParams, UpdateOrderDto, UserRole } from '@ecommerce/types';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';

@ApiTags('Orders')
@Controller('orders')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class OrderController {
    constructor(private readonly ordersService: OrderService) { }

    @Post()
    @UseGuards(RolesGuard)
    @Roles(UserRole.USER, UserRole.SELLER)
    @ApiOperation({ summary: 'Create a new order' })
    @ApiResponse({ 
        status: 201, 
        description: 'Order successfully created',
        schema: {
            properties: {
                id: { type: 'number' },
                userId: { type: 'number' },
                totalPrice: { type: 'number' },
                items: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            productId: { type: 'number' },
                            quantity: { type: 'number' },
                            unitPrice: { type: 'number' },
                            totalPrice: { type: 'number' }
                        }
                    }
                }
            }
        }
    })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiResponse({ status: 403, description: 'Forbidden - Insufficient permissions' })
    @ApiResponse({ status: 400, description: 'Bad request - Invalid input data' })
    create(@Body() dto: CreateOrderDto) {
        return this.ordersService.create(dto);
    }

    @Get()
    @ApiOperation({ summary: 'Get all orders with pagination' })
    @ApiQuery({ name: 'page', required: false, type: Number, description: 'Page number' })
    @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Items per page' })
    @ApiResponse({ 
        status: 200, 
        description: 'List of orders',
        schema: {
            properties: {
                items: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            id: { type: 'number' },
                            userId: { type: 'number' },
                            totalPrice: { type: 'number' },
                            items: {
                                type: 'array',
                                items: {
                                    type: 'object',
                                    properties: {
                                        productId: { type: 'number' },
                                        quantity: { type: 'number' },
                                        unitPrice: { type: 'number' },
                                        totalPrice: { type: 'number' }
                                    }
                                }
                            }
                        }
                    }
                },
                total: { type: 'number' },
                page: { type: 'number' },
                limit: { type: 'number' }
            }
        }
    })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    findAll(@Query() query: PaginationParams) {
        return this.ordersService.findAll(query);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get order by ID' })
    @ApiResponse({ 
        status: 200, 
        description: 'Order details',
        schema: {
            properties: {
                id: { type: 'number' },
                userId: { type: 'number' },
                totalPrice: { type: 'number' },
                items: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            productId: { type: 'number' },
                            quantity: { type: 'number' },
                            unitPrice: { type: 'number' },
                            totalPrice: { type: 'number' }
                        }
                    }
                }
            }
        }
    })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiResponse({ status: 404, description: 'Order not found' })
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.ordersService.findOne(id);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update an order' })
    @ApiResponse({ 
        status: 200, 
        description: 'Order successfully updated',
        schema: {
            properties: {
                id: { type: 'number' },
                userId: { type: 'number' },
                totalPrice: { type: 'number' },
                items: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            productId: { type: 'number' },
                            quantity: { type: 'number' },
                            unitPrice: { type: 'number' },
                            totalPrice: { type: 'number' }
                        }
                    }
                }
            }
        }
    })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiResponse({ status: 404, description: 'Order not found' })
    @ApiResponse({ status: 400, description: 'Bad request - Invalid input data' })
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: UpdateOrderDto,
    ) {
        return this.ordersService.update(id, dto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete an order' })
    @ApiResponse({ status: 200, description: 'Order successfully deleted' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiResponse({ status: 404, description: 'Order not found' })
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.ordersService.remove(id);
    }
}
