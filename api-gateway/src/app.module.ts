import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ProductsModule } from './products/products.module';
import { OrderModule } from './order/order.module';
import { AuthModule } from './auth/auth.module';
import { CartModule } from './cart/cart.module';
import { UsersModule } from './users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: join(__dirname, '..', '..', '.env'),
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: 'JWT_EXPIRES_IN' },
      }),
      global: true,
    }),
    UsersModule,
    AuthModule,
    ProductsModule,
    OrderModule,
    CartModule,
  ]
})
export class AppModule {}

