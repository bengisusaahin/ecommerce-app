import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { ProductsService } from '../service/products.service';
import { ProductType } from '../utils/types';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { CapitalizeNamePipe } from 'src/common/pipes/capitalize-name.pipe';

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

    @Post()
    createProduct(@Body(CapitalizeNamePipe) createProductDto: CreateProductDto): ProductType {
        return this.productsService.create(createProductDto);
    }

    @Put(':id')
    updateProduct(
        @Param('id', ParseIntPipe) id: number,
        @Body(CapitalizeNamePipe) updateProductDto: UpdateProductDto,
    ): ProductType {
        return this.productsService.update(id, updateProductDto);
    }

    @Delete(':id')
    deleteProduct(@Param('id', ParseIntPipe) id: number): void {
        return this.productsService.remove(id);
    }
}
