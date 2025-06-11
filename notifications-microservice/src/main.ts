import { NestFactory } from '@nestjs/core';
import { NotificationsModule } from './notifications.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { MICROSERVICES } from '@ecommerce/types';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const appContext = await NestFactory.createApplicationContext(NotificationsModule);
  const config = appContext.get(ConfigService);

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    NotificationsModule,
    {
      transport: Transport.KAFKA,
      options: {
        client: {
          clientId: config.get('NOTIFICATIONS_KAFKA_CLIENT_ID'),
          brokers: [`${MICROSERVICES.KAFKA.host}:${MICROSERVICES.KAFKA.port}`],
        },
        consumer: {
          groupId: config.get<string>('NOTIFICATIONS_KAFKA_CONSUMER_GROUP_ID') || 'notification-consumer',
        },
      },
    },
  );
  await app.listen();
  console.log('Notifications microservice is listening to Kafka events...');
}
bootstrap();
