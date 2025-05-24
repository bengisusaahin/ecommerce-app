import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ShippingController } from './shipping.controller';
import { ShippingService } from './shipping.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Shipping, ShippingSchema } from './schema/shipping.schema';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { KAFKA_PATTERNS } from './util/types';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      }),
    }),
    MongooseModule.forFeature([{ name: Shipping.name, schema: ShippingSchema }]),

    ClientsModule.register([
      {
        name: KAFKA_PATTERNS.name,
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'shipping',
            brokers: [`${KAFKA_PATTERNS.host}:${KAFKA_PATTERNS.port}`],
          },
          consumer: {
            groupId: 'shipping-consumer',
          },
        },
      },
    ]),
  ],
  controllers: [ShippingController],
  providers: [ShippingService],
})
export class ShippingModule { }
