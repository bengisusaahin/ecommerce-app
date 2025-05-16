import { Module } from '@nestjs/common';
import { CartService } from './service/cart.service';
import { CartController } from './controller/cart.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: 'CART_MICROSERVICE',
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (config: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            host: config.get('CART_MICROSERVICE_HOST'),
            port: config.get<number>('CART_MICROSERVICE_PORT'),
          },
        }),
      },
    ]),
  ],
  controllers: [CartController],
  providers: [CartService],
  exports: [CartService]
})
export class CartModule {}
