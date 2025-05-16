import { Module } from '@nestjs/common';
import { OrdersModule } from './orders/orders.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './orders/entities/order.entity';
import { OrderItem } from './orders/entities/order-item.entity';

@Module({
  imports: [
    OrdersModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('ORDERS_POSTGRES_HOST'),
        port: configService.get<number>('ORDERS_POSTGRES_PORT'),
        username: configService.get<string>('ORDERS_POSTGRES_USER'),
        password: configService.get<string>('ORDERS_POSTGRES_PASSWORD'),
        database: configService.get<string>('ORDERS_POSTGRES_DB'),
        autoLoadEntities: true,
        entities: [Order, OrderItem],
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
