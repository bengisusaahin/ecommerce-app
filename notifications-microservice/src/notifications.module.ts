import { Module } from '@nestjs/common';
import { NotificationsController } from './notifications.controller';
import { NotificationsService } from './notifications.service';
import { MailService } from './mail/mail.service';

@Module({
  imports: [],
  controllers: [NotificationsController],
  providers: [NotificationsService, MailService],
})
export class NotificationsModule {}
