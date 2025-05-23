import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { OrderItem } from './entities/order-item.entity';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { KAFKA_PATTERNS } from './utils/types';
import { OrderKafkaProducerService } from './order-kafka-producer.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order, OrderItem]),
    ClientsModule.register([
      {
        name: KAFKA_PATTERNS.name,
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'orders',
            brokers: [`${KAFKA_PATTERNS.host}:${KAFKA_PATTERNS.port}`],
          },
        },
      },
    ]),
  ],
  controllers: [OrdersController],
  providers: [OrdersService, OrderKafkaProducerService],
})
export class OrdersModule { }
