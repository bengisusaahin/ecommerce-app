import { NestFactory } from '@nestjs/core';
import { StockModule } from './stock.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { MICROSERVICES } from '@ecommerce/types';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const appContext = await NestFactory.createApplicationContext(StockModule);
  const config = appContext.get(ConfigService);
  
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    StockModule,
    {
      transport: Transport.KAFKA,
      options: {
        client: {
          clientId: config.get('STOCK_KAFKA_CLIENT_ID'),
          brokers: [`${MICROSERVICES.KAFKA.host}:${MICROSERVICES.KAFKA.port}`],
        },
        consumer: {
          groupId: config.get<string>('STOCK_KAFKA_CONSUMER_GROUP_ID') || 'stock-consumer',
        },
      },
    },
  );
  await app.listen();
  console.log('Stock microservice is listening to Kafka events...');
}
bootstrap();