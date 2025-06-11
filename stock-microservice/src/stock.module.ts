import { Module } from '@nestjs/common';
import { StockService } from './stock.service';
import { StockController } from './stock.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MICROSERVICES } from '@ecommerce/types';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: join(__dirname, '..', '..', '.env'),
    }),
    ClientsModule.registerAsync([
      {
        name: MICROSERVICES.PRODUCT.name,
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (config: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            host: config.get('PRODUCTS_MICROSERVICE_HOST'),
            port: config.get<number>('PRODUCTS_MICROSERVICE_PORT'),
          },
        }),
      },
      {
        name: MICROSERVICES.KAFKA.name,
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (config: ConfigService) => ({
          transport: Transport.KAFKA,
          options: {
            client: {
              clientId: config.get('STOCK_KAFKA_CLIENT_ID'),
              brokers: [`${MICROSERVICES.KAFKA.host}:${MICROSERVICES.KAFKA.port}`],
            },
          },
        }),
      },
    ]),
  ],
  controllers: [StockController],
  providers: [StockService],
})
export class StockModule { }
