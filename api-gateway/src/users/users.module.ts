import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    ConfigModule,
    ClientsModule.registerAsync([
      {
        name: 'USERS_MICROSERVICE',
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (config: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            host: config.get('USERS_MICROSERVICE_HOST'), 
            port: config.get<number>('USERS_MICROSERVICE_PORT'),
          },
        }),
      },
    ]),
    AuthModule
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule { }
