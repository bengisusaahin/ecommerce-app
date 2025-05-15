import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ProductsModule } from './products/products.module';
import { OrderModule } from './order/order.module';
import { PaymentModule } from './payment/payment.module';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CartModule } from './cart/cart.module';
import { ProductCommentModule } from './product-comment/product-comment.module';
import { UserVisitHistoryModule } from './user-visit-history/user-visit-history.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URI'),
        connectionFactory: (connection) => {
          connection.on('error', (err) => {
            console.error('MongoDB connection error:', err);
          });
          return connection;
        }
      }),
    }),
    UsersModule, ProductsModule, OrderModule, PaymentModule, AuthModule, CartModule, ProductCommentModule, UserVisitHistoryModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
