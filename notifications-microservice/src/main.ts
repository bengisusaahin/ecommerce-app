import { NestFactory } from '@nestjs/core';
import { NotificationsModule } from './notifications.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { KAFKA_PATTERNS } from './utils/types';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    NotificationsModule,
    {
      transport: Transport.KAFKA,
      options: {
        client: {
          clientId: 'notifications',
          brokers: [`${KAFKA_PATTERNS.host}:${KAFKA_PATTERNS.port}`],
        },
        consumer: {
          groupId: 'notification-consumer',
        },
      },
    },
  );
  await app.listen();
  console.log('Notifications microservice is listening to Kafka events...');
}
bootstrap();
