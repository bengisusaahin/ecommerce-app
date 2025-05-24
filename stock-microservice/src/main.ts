import { NestFactory } from '@nestjs/core';
import { StockModule } from './stock.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { KAFKA_PATTERNS } from './util/types';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    StockModule,
    {
      transport: Transport.KAFKA,
      options: {
        client: {
          clientId: 'stock',
          brokers: [`${KAFKA_PATTERNS.host}:${KAFKA_PATTERNS.port}`],
        },
        consumer: {
          groupId: 'stock-consumer',
        },
      },
    },
  );
  await app.listen();
  console.log('Stock microservice is listening to Kafka events...');
}
bootstrap();