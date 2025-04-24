import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ProductsService } from '../service/products.service';
import { ProductType } from '../utils/types';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { CapitalizeNamePipe } from 'src/common/pipes/capitalize-name.pipe';
import { AdminGuard } from 'src/auth/guards/admin.guard';

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
    @UseGuards(AdminGuard)
    createProduct(@Body(CapitalizeNamePipe) createProductDto: CreateProductDto): ProductType {
        return this.productsService.create(createProductDto);
    }

    @Put(':id')
    @UseGuards(AdminGuard)
    updateProduct(
        @Param('id', ParseIntPipe) id: number,
        @Body(CapitalizeNamePipe) updateProductDto: UpdateProductDto,
    ): ProductType {
        return this.productsService.update(id, updateProductDto);
    }

    @Delete(':id')
    @UseGuards(AdminGuard)
    deleteProduct(@Param('id', ParseIntPipe) id: number): void {
        return this.productsService.remove(id);
    }
}
