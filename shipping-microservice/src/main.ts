import { NestFactory } from '@nestjs/core';
import { ShippingModule } from './shipping.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { KAFKA_PATTERNS } from './util/types';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    ShippingModule,
    {
      transport: Transport.KAFKA,
      options: {
        client: {
          clientId: 'shipping',
          brokers: [`${KAFKA_PATTERNS.host}:${KAFKA_PATTERNS.port}`],
        },
        consumer: {
          groupId: 'shipping-consumer',
        },
      },
    },
  );
  await app.listen();
  console.log('Shipping microservice is listening to Kafka events...');
}
bootstrap();
