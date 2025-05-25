import { Module } from '@nestjs/common';
import { StockService } from './stock.service';
import { StockController } from './stock.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { KAFKA_PATTERNS } from './util/types';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ClientsModule.registerAsync([
      {
        name: 'PRODUCTS_MICROSERVICE',
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
        name: KAFKA_PATTERNS.name,
        useFactory: () => ({
          transport: Transport.KAFKA,
          options: {
            client: {
              clientId: 'stock',
              brokers: [`${KAFKA_PATTERNS.host}:${KAFKA_PATTERNS.port}`],
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
