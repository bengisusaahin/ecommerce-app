import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, Req, UseGuards, UseInterceptors } from '@nestjs/common';
import { ProductsService } from '../service/products.service';
import { CapitalizeNamePipe } from 'src/common/pipes/capitalize-name.pipe';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { CreateProductDto, SearchablePaginationParams, UpdateProductDto, UserRole } from '@ecommerce/types';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';

@ApiTags('Products')
@Controller('products')
@UseInterceptors(CacheInterceptor)
export class ProductsController {
    constructor(
        private readonly productsService: ProductsService
    ) { }

    @Post()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN, UserRole.SELLER)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Create a new product' })
    @ApiResponse({ 
        status: 201, 
        description: 'Product successfully created',
        schema: {
            properties: {
                id: { type: 'number' },
                name: { type: 'string' },
                description: { type: 'string' },
                price: { type: 'number' },
                stock: { type: 'number' },
                is_active: { type: 'boolean' },
                seller_id: { type: 'number' },
                category_id: { type: 'number' },
                rating: { type: 'number' },
                sell_count: { type: 'number' },
                images: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            url: { type: 'string' },
                            index: { type: 'number' }
                        }
                    }
                }
            }
        }
    })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiResponse({ status: 403, description: 'Forbidden - Insufficient permissions' })
    create(@Body(CapitalizeNamePipe) dto: CreateProductDto) {
        return this.productsService.create(dto);
    }

    @Get()
    @ApiOperation({ summary: 'Get all products with pagination and search' })
    @ApiQuery({ name: 'page', required: false, type: Number, description: 'Page number' })
    @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Items per page' })
    @ApiQuery({ name: 'search', required: false, type: String, description: 'Search term' })
    @ApiResponse({ 
        status: 200, 
        description: 'List of products',
        schema: {
            properties: {
                items: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            id: { type: 'number' },
                            name: { type: 'string' },
                            description: { type: 'string' },
                            price: { type: 'number' },
                            stock: { type: 'number' },
                            is_active: { type: 'boolean' },
                            seller_id: { type: 'number' },
                            category_id: { type: 'number' },
                            rating: { type: 'number' },
                            sell_count: { type: 'number' },
                            images: {
                                type: 'array',
                                items: {
                                    type: 'object',
                                    properties: {
                                        url: { type: 'string' },
                                        index: { type: 'number' }
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
    findAll(@Query() query: SearchablePaginationParams) {
        console.log("Products Findall DB den geldi");
        return this.productsService.findAll(query);
    }

    @Get('seller/:sellerId')
    @ApiOperation({ summary: 'Get products by seller ID' })
    @ApiResponse({ 
        status: 200, 
        description: 'List of products for the specified seller',
        schema: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    id: { type: 'number' },
                    name: { type: 'string' },
                    description: { type: 'string' },
                    price: { type: 'number' },
                    stock: { type: 'number' },
                    is_active: { type: 'boolean' },
                    seller_id: { type: 'number' },
                    category_id: { type: 'number' },
                    rating: { type: 'number' },
                    sell_count: { type: 'number' },
                    images: {
                        type: 'array',
                        items: {
                            type: 'object',
                            properties: {
                                url: { type: 'string' },
                                index: { type: 'number' }
                            }
                        }
                    }
                }
            }
        }
    })
    findBySeller(@Param('sellerId') sellerId: number) {
        return this.productsService.findBySeller(sellerId);
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get a product by ID' })
    @ApiResponse({ 
        status: 200, 
        description: 'Product details',
        schema: {
            properties: {
                id: { type: 'number' },
                name: { type: 'string' },
                description: { type: 'string' },
                price: { type: 'number' },
                stock: { type: 'number' },
                is_active: { type: 'boolean' },
                seller_id: { type: 'number' },
                category_id: { type: 'number' },
                rating: { type: 'number' },
                sell_count: { type: 'number' },
                images: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            url: { type: 'string' },
                            index: { type: 'number' }
                        }
                    }
                }
            }
        }
    })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiResponse({ status: 404, description: 'Product not found' })
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.productsService.findOne(id);
    }

    @Put(':id')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.SELLER, UserRole.ADMIN)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Update a product' })
    @ApiResponse({ 
        status: 200, 
        description: 'Product successfully updated',
        schema: {
            properties: {
                id: { type: 'number' },
                name: { type: 'string' },
                description: { type: 'string' },
                price: { type: 'number' },
                stock: { type: 'number' },
                is_active: { type: 'boolean' },
                seller_id: { type: 'number' },
                category_id: { type: 'number' },
                rating: { type: 'number' },
                sell_count: { type: 'number' },
                images: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            url: { type: 'string' },
                            index: { type: 'number' }
                        }
                    }
                }
            }
        }
    })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiResponse({ status: 403, description: 'Forbidden - Insufficient permissions' })
    @ApiResponse({ status: 404, description: 'Product not found' })
    update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateProductDto) {
        return this.productsService.update(id, dto);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.SELLER, UserRole.ADMIN)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Delete a product' })
    @ApiResponse({ status: 200, description: 'Product successfully deleted' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiResponse({ status: 403, description: 'Forbidden - Insufficient permissions' })
    @ApiResponse({ status: 404, description: 'Product not found' })
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.productsService.remove(id);
    }
}
