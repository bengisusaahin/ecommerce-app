import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { OrderCreatedEvent } from '../events/order-created.event';

@Injectable()
export class MailService {
    private transporter;

    constructor() {
        nodemailer.createTestAccount().then((testAccount) => {
            this.transporter = nodemailer.createTransport({
                host: testAccount.smtp.host,
                port: testAccount.smtp.port,
                secure: testAccount.smtp.secure,
                auth: {
                    user: testAccount.user,
                    pass: testAccount.pass,
                },
            });

            console.log('📧 Ethereal test account ready');
            console.log(`👤 Login: ${testAccount.user}`);
            console.log(`🔐 Password: ${testAccount.pass}`);
        });
    }

    async sendOrderMail(event: OrderCreatedEvent) {
        const info = await this.transporter.sendMail({
            from: '"Acme Store" <no-reply@acme.com>',
            to: 'customer@example.com', // test recipient
            subject: `Your Order Has Been Received (#${event.orderId})`,
            text: `Hello! Your order has been successfully placed. Total: ${event.totalPrice} ₺ - Date: ${event.createdAt}`,
            html: `
      <h2>Order Details</h2>
      <p><b>Order ID:</b> ${event.orderId}</p>
      <p><b>Date:</b> ${event.createdAt}</p>
      <p><b>Total:</b> ${event.totalPrice} ₺</p>
      <h3>Items:</h3>
      <ul>
        ${event.items.map(i => `<li>Product ID: ${i.productId} - Quantity: ${i.quantity}</li>`).join('')}
      </ul>
    `,
        });

        console.log('Mail sent. Preview URL:', nodemailer.getTestMessageUrl(info));
    }
}
