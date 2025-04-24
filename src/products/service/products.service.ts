import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductType } from '../utils/types';
import { dummyProducts } from 'src/data/DummyData';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';

@Injectable()
export class ProductsService {
    private products: ProductType[] = dummyProducts;

    findAll(query: {
        page?: number;
        limit?: number;
        sort?: keyof ProductType;
        order?: 'asc' | 'desc';
    }): ProductType[] {
        const { page = 1, limit = 10, sort = 'id', order = 'asc' } = query;

        const sorted = [...this.products].sort((a, b) => {
            if (order === 'asc') return a[sort] > b[sort] ? 1 : -1;
            else return a[sort] < b[sort] ? 1 : -1;
        });

        const start = (page - 1) * limit;
        const end = start + limit;

        return sorted.slice(start, end);
    }

    findOne(id: number): ProductType {
        const product = this.products.find((p) => p.id === id);
        if (!product) throw new NotFoundException(`Product with id ${id} not found`);
        return product;
    }

    create(dto: CreateProductDto): ProductType {
        const newProduct: ProductType = {
            id: Math.max(...this.products.map((p) => p.id)) + 1,
            ...dto,
        };

        this.products.push(newProduct);
        return newProduct;
    }

    update(id: number, dto: UpdateProductDto): ProductType {
        const productIndex = this.products.findIndex((p) => p.id === id);
        if (productIndex === -1) throw new NotFoundException(`Product with id ${id} not found`);

        const updatedProduct = { ...this.products[productIndex], ...dto };
        this.products[productIndex] = updatedProduct;
        return updatedProduct;
    }
}
