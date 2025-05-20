import { Module } from '@nestjs/common';
import { OrderController } from './controller/order.controller';
import { OrderService } from './service/order.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    ConfigModule,
    ClientsModule.registerAsync([
      {
        name: 'ORDERS_MICROSERVICE',
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (config: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            host: config.get('ORDERS_MICROSERVICE_HOST'),
            port: config.get<number>('ORDERS_MICROSERVICE_PORT'),
          },
        }),
      },
    ]),
    AuthModule
  ],
  controllers: [OrderController],
  providers: [OrderService]
})
export class OrderModule { }
