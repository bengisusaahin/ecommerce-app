import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { NotificationsController } from './notifications.controller';
import { NotificationsService } from './notifications.service';
import { MailService } from './mail/mail.service';
import { join } from 'path';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MICROSERVICES } from '@ecommerce/types';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: join(__dirname, '..', '..', '.env'),
    }),
    ClientsModule.register([{
      name: MICROSERVICES.USER.name,
      transport: Transport.TCP,
      options: {
        host: MICROSERVICES.USER.host,
        port: MICROSERVICES.USER.port
      }
    }]),
  ],
  controllers: [NotificationsController],
  providers: [NotificationsService, MailService],
})
export class NotificationsModule {}
