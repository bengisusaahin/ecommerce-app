import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { ProductsService } from '../service/products.service';
import { ProductType } from '../utils/types';

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) { }

    @Get()
    getProducts(
        @Query('page') page?: number,
        @Query('limit') limit?: number,
        @Query('sort') sort?: keyof ProductType,
        @Query('order') order?: 'asc' | 'desc',
    ): ProductType[] {
        return this.productsService.findAll({ page, limit, sort, order });
    }

    @Get(':id')
    getProductById(@Param('id', ParseIntPipe) id: number): ProductType {
        return this.productsService.findOne(id);
    }
}
