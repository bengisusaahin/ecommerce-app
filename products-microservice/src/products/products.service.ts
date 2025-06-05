import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { ProductImage } from './entities/product-image.entity';
import { plainToInstance } from 'class-transformer';
import { CreateProductDto, ProductResponseDto, StockUpdateResponseDto, UpdateProductDto } from '@ecommerce/types';

@Injectable()
export class ProductsService {
  private readonly logger = new Logger(ProductsService.name);

  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,

    @InjectRepository(ProductImage)
    private readonly imageRepository: Repository<ProductImage>,
  ) { }

  async create(createProductDto: CreateProductDto): Promise<ProductResponseDto> {
    const { images, ...productData } = createProductDto;

    const product = this.productRepository.create(productData);
    const savedProduct = await this.productRepository.save(product);

    const imageEntities = images.map((img) =>
      this.imageRepository.create({ ...img, productId: savedProduct.id }),
    );
    const savedImages = await this.imageRepository.save(imageEntities);

    return plainToInstance(ProductResponseDto, {
      ...savedProduct,
      images: savedImages,
    }, { excludeExtraneousValues: true });
  }

  async decreaseStock(productId: number, quantity: number): Promise<StockUpdateResponseDto> {
    const product = await this.productRepository.findOne({ where: { id: productId } });

    if (!product) {
      throw new NotFoundException(`Product with ID ${productId} not found`);
    }

    if (product.stock < quantity) {
      this.logger.warn(`Insufficient stock for product ${productId}`);
      return StockUpdateResponseDto.warning(product.stock);
    }

    await this.productRepository.decrement({ id: productId }, 'stock', quantity);

    this.logger.log(`Stock updated: product ${productId} - ${quantity}`);
    return StockUpdateResponseDto.success();
  }

  async findAll(): Promise<ProductResponseDto[]> {
    const products = await this.productRepository.find();

    const results = await Promise.all(
      products.map(async (product) => {
        const images = await this.imageRepository.find({
          where: { productId: product.id },
        });

        return plainToInstance(ProductResponseDto, {
          ...product,
          images,
        }, { excludeExtraneousValues: true });
      })
    );

    return results;
  }

  async findBySeller(sellerId: number) {
    return this.productRepository.find({
      where: { sellerId },
    });
  }

  async findOne(id: number): Promise<ProductResponseDto> {
    const product = await this.productRepository.findOneBy({ id });
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    const images = await this.imageRepository.find({ where: { productId: id } });

    return plainToInstance(ProductResponseDto, {
      ...product,
      images,
    }, { excludeExtraneousValues: true });
  }

  async update(id: number, updateDto: UpdateProductDto): Promise<ProductResponseDto> {
    const product = await this.productRepository.preload({ id, ...updateDto });
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    const updated = await this.productRepository.save(product);
    const images = await this.imageRepository.find({ where: { productId: id } });

    return plainToInstance(ProductResponseDto, {
      ...updated,
      images,
    }, { excludeExtraneousValues: true });
  }

  async remove(id: number): Promise<{ message: string }> {
    const result = await this.productRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return { message: 'Product deleted successfully' };
  }
}
