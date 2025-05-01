import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ProductsService } from '../service/products.service';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { CapitalizeNamePipe } from 'src/common/pipes/capitalize-name.pipe';
import { AdminGuard } from 'src/auth/guards/admin.guard';
import { Product } from '../entity/product.entity';

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) { }

    @Get()
    getProducts(
        @Query('page') page?: number,
        @Query('limit') limit?: number,
        @Query('sort') sort?: keyof Product,
        @Query('order') order?: 'asc' | 'desc',
        @Query('search') search?: string,
    ): Promise<Product[]> {
        return this.productsService.findAll({ page, limit, sort, order, search });
    }

    @Get(':id')
    getProductById(@Param('id', ParseIntPipe) id: number): Promise<Product> {
        return this.productsService.findOne(id);
    }

    @Post()
    @UseGuards(AdminGuard)
    createProduct(@Body(CapitalizeNamePipe) createProductDto: CreateProductDto): Promise<Product> {
        return this.productsService.create(createProductDto);
    }

    @Put(':id')
    @UseGuards(AdminGuard)
    updateProduct(
        @Param('id', ParseIntPipe) id: number,
        @Body(CapitalizeNamePipe) updateProductDto: UpdateProductDto,
    ): Promise<Product> {
        return this.productsService.update(id, updateProductDto);
    }

    @Delete(':id')
    @UseGuards(AdminGuard)
    deleteProduct(@Param('id', ParseIntPipe) id: number): Promise<{ message: string }> {
        return this.productsService.remove(id);
    }
}
