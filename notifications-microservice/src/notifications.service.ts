import { Inject, Injectable } from '@nestjs/common';
import { MailService } from './mail/mail.service';
import { MICROSERVICES, OrderCreatedEvent, USER_PATTERNS } from '@ecommerce/types';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class NotificationsService {
  constructor(
    @Inject(MICROSERVICES.USER.name)
    private readonly userClient: ClientProxy,
    private readonly mailService: MailService) {}

  async orderCreatedEventHandler(orderCreatedEvent: OrderCreatedEvent) {
    console.log('Order Created Event:', orderCreatedEvent);
    const user = await firstValueFrom(
      this.userClient.send(
        { cmd: USER_PATTERNS.FindOne },
        { userId: orderCreatedEvent.userId }
      )
    )

    await this.mailService.sendOrderMail(orderCreatedEvent, user.email);
  }
}
