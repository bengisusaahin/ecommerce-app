import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { OrderItem } from './entities/order-item.entity';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { OrderKafkaProducerService } from './order-kafka-producer.service';
import { MICROSERVICES } from '@ecommerce/types';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order, OrderItem]),
    ClientsModule.register([
      {
        name: MICROSERVICES.KAFKA.name,
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'orders',
            brokers: [`${MICROSERVICES.KAFKA.host}:${MICROSERVICES.KAFKA.port}`],
          },
        },
      },
    ]),
  ],
  controllers: [OrdersController],
  providers: [OrdersService, OrderKafkaProducerService],
})
export class OrdersModule { }
