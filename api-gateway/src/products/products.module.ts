import { Module } from '@nestjs/common';
import { ProductsController } from './controller/products.controller';
import { ProductsService } from './service/products.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entity/product.entity';
import { OrderItem } from 'src/order/entity/order-item.entity';
import { UsersModule } from 'src/users/users.module';
import { ProductImage } from './entity/product-image.entity';
import { UserVisitHistoryModule } from 'src/user-visit-history/user-visit-history.module';

@Module({
  imports: [TypeOrmModule.forFeature([Product, ProductImage, OrderItem]),
    UsersModule,
    UserVisitHistoryModule
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
  exports: [ProductsService, TypeOrmModule],

})
export class ProductsModule { }
