import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, Req, UseGuards } from '@nestjs/common';
import { ProductsService } from '../service/products.service';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { CapitalizeNamePipe } from 'src/common/pipes/capitalize-name.pipe';
import { Product } from '../entity/product.entity';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { UserRole } from 'src/users/utils/types';
import UserVisitHistoryService from 'src/user-visit-history/service/user-visit-history.service';

@Controller('products')
export class ProductsController {
    constructor(
        private readonly productsService: ProductsService,
        private readonly userVisitHistoryService: UserVisitHistoryService
    ) { }

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
    async getProductById(
        @Param('id', ParseIntPipe) id: number,
        @Req() req: any
    ): Promise<Product> {
        const product = await this.productsService.findOne(id);
        
        if (req.user) {
            await this.userVisitHistoryService.recordVisit(req.user.id, String(id));
        }
        
        return product;
    }

    @Post()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN, UserRole.SELLER)
    createProduct(@Body(CapitalizeNamePipe) createProductDto: CreateProductDto): Promise<Product> {
        return this.productsService.create(createProductDto);
    }

    @Put(':id')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN, UserRole.SELLER)
    updateProduct(
        @Param('id', ParseIntPipe) id: number,
        @Body(CapitalizeNamePipe) updateProductDto: UpdateProductDto,
    ): Promise<Product> {
        return this.productsService.update(id, updateProductDto);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN, UserRole.SELLER)
    deleteProduct(@Param('id', ParseIntPipe) id: number): Promise<{ message: string }> {
        return this.productsService.remove(id);
    }
}
