import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '../entity/product.entity';
import { ILike, Repository } from 'typeorm';

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,
    ) { }

    async findAll(query: {
        page?: number;
        limit?: number;
        sort?: keyof Product;
        order?: 'asc' | 'desc';
        search?: string;
    }): Promise<Product[]> {
        const { page = 1, limit = 10, sort = 'id', order = 'asc', search } = query;

        const where = search
            ? [
                { name: ILike(`%${search}%`) },
                { description: ILike(`%${search}%`) },
            ]
            : undefined;

        return this.productRepository.find({
            where,
            order: { [sort]: order.toUpperCase() as 'ASC' | 'DESC' },
            skip: (page - 1) * limit,
            take: limit,
        });
    }

    async findOne(id: number): Promise<Product> {
        const product = await this.productRepository.findOne({ where: { id } });
        if (!product) throw new NotFoundException(`Product with id ${id} not found`);
        return product;
    }

    async create(dto: CreateProductDto): Promise<Product> {

        if (dto.price <= 0) {
            throw new BadRequestException('Price must be greater than 0');
        }

        if (dto.stock < 0) {
            throw new BadRequestException('Stock cannot be negative');
        }
        
        const newProduct = this.productRepository.create(dto);
        return this.productRepository.save(newProduct);
    }

    async update(id: number, dto: UpdateProductDto): Promise<Product> {
        const product = await this.findOne(id);

        if (dto.price && dto.price <= 0) {
            throw new BadRequestException('Price must be greater than 0');
        }

        if (dto.stock && dto.stock < 0) {
            throw new BadRequestException('Stock cannot be negative');
        }
        
        const updated = Object.assign(product, dto);
        return this.productRepository.save(updated);
    }

    async remove(id: number): Promise<{ message: string }> {
        const result = await this.productRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`Product with id ${id} not found`);
        }
        return { message: `Product with id ${id} successfully deleted` };
    }
}
