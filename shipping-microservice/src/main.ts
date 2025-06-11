import { NestFactory } from '@nestjs/core';
import { ShippingModule } from './shipping.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { MICROSERVICES } from '@ecommerce/types';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const appContext = await NestFactory.createApplicationContext(ShippingModule);
  const config = appContext.get(ConfigService);
  
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    ShippingModule,
    {
      transport: Transport.KAFKA,
      options: {
        client: {
          clientId: config.get('SHIPPING_KAFKA_CLIENT_ID'),
          brokers: [`${MICROSERVICES.KAFKA.host}:${MICROSERVICES.KAFKA.port}`],
        },
        consumer: {
          groupId: config.get<string>('SHIPPING_KAFKA_CONSUMER_GROUP_ID') || 'shipping-consumer',
        },
      },
    },
  );
  await app.listen();
  console.log('Shipping microservice is listening to Kafka events...');
}
bootstrap();
