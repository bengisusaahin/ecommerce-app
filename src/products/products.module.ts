import { Module } from '@nestjs/common';
import { ProductsController } from './controller/products.controller';
import { ProductsService } from './service/products.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entity/product.entity';
import { OrderItem } from 'src/order/entity/order-item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product, OrderItem])],
  controllers: [ProductsController],
  providers: [ProductsService]
})
export class ProductsModule {}
