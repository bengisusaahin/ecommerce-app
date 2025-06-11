import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ShippingController } from './shipping.controller';
import { ShippingService } from './shipping.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Shipping, ShippingSchema } from './schema/shipping.schema';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { MICROSERVICES } from '@ecommerce/types';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: join(__dirname, '..', '..', '.env'),
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      }),
    }),
    MongooseModule.forFeature([{ name: Shipping.name, schema: ShippingSchema }]),

    ClientsModule.registerAsync([
      {
        name: MICROSERVICES.KAFKA.name,
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (config: ConfigService) => ({
          transport: Transport.KAFKA,
          options: {
            client: {
              clientId: config.get('SHIPPING_KAFKA_CLIENT_ID'),
              brokers: [`${MICROSERVICES.KAFKA.host}:${MICROSERVICES.KAFKA.port}`],
            },
            consumer: {
              groupId: config.get<string>('SHIPPING_KAFKA_CONSUMER_GROUP_ID') || 'shipping-consumer',

            },
          },
        }),
      },
    ]),
  ],
  controllers: [ShippingController],
  providers: [ShippingService],
})
export class ShippingModule { }
