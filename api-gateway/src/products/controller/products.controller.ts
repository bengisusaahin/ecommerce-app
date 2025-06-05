import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, Req, UseGuards } from '@nestjs/common';
import { ProductsService } from '../service/products.service';
import { CapitalizeNamePipe } from 'src/common/pipes/capitalize-name.pipe';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { CreateProductDto, SearchablePaginationParams, UpdateProductDto, UserRole } from '@ecommerce/types';

@Controller('products')
export class ProductsController {
    constructor(
        private readonly productsService: ProductsService
    ) { }

    @Post()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN, UserRole.SELLER)
    create(@Body(CapitalizeNamePipe) dto: CreateProductDto) {
        return this.productsService.create(dto);
    }

    @Get()
    findAll(@Query() query: SearchablePaginationParams) {
        return this.productsService.findAll(query);
    }

    @Get('seller/:sellerId')
    findBySeller(@Param('sellerId') sellerId: number) {
        return this.productsService.findBySeller(sellerId);
    }


    @Get(':id')
    @UseGuards(JwtAuthGuard)
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.productsService.findOne(id);
    }

    @Put(':id')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.SELLER, UserRole.ADMIN)
    update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateProductDto) {
        return this.productsService.update(id, dto);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.SELLER, UserRole.ADMIN)
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.productsService.remove(id);
    }
}
