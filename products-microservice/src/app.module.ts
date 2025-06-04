import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './products/entities/product.entity';
import { ProductImage } from './products/entities/product-image.entity';
import { join } from 'path';

@Module({
  imports: [
    ProductsModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: join(__dirname, '..', '..', '.env'),
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('PRODUCTS_POSTGRES_HOST'),
        port: configService.get<number>('PRODUCTS_POSTGRES_PORT'),
        username: configService.get<string>('PRODUCTS_POSTGRES_USER'),
        password: configService.get<string>('PRODUCTS_POSTGRES_PASSWORD'),
        database: configService.get<string>('PRODUCTS_POSTGRES_DB'),
        autoLoadEntities: true,
        entities: [Product, ProductImage],
        synchronize: true,
        cache: {
          duration: configService.get<number>('TYPEORM_CACHE_DURATION'),
        },
      }),
    }),
  ],
  controllers: [],
  providers: [],

})
export class AppModule {}
