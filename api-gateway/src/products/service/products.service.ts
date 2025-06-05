import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateProductDto, PRODUCT_PATTERNS, SearchablePaginationParams, UpdateProductDto } from '@ecommerce/types';

@Injectable()
export class ProductsService {
    constructor(
        @Inject('PRODUCTS_MICROSERVICE')
        private readonly productsMicroservice: ClientProxy,
    ) { }

    create(createProductDto: CreateProductDto) {
        return this.productsMicroservice.send(
            { cmd: PRODUCT_PATTERNS.Create },
            createProductDto,
        );
    }

    findAll(pagination: SearchablePaginationParams) {
        return this.productsMicroservice.send(
            { cmd: PRODUCT_PATTERNS.FindAll },
            pagination,
        );
    }

    findBySeller(sellerId: number) {
        this.productsMicroservice.send({ cmd: PRODUCT_PATTERNS.FindBySeller }, { sellerId });
    }

    findOne(id: number) {
        return this.productsMicroservice.send({ cmd: PRODUCT_PATTERNS.FindOne }, { id });
    }

    update(id: number, dto: UpdateProductDto) {
        return this.productsMicroservice.send(
            { cmd: PRODUCT_PATTERNS.Update },
            { id, updateProductDto: dto },
        );
    }

    remove(id: number) {
        return this.productsMicroservice.send({ cmd: PRODUCT_PATTERNS.Remove }, { id });
    }
}
