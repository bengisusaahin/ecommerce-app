import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: join(__dirname, '..', '..', '.env'),
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get<string>('USERS_POSTGRES_HOST'),
        port: config.get<number>('USERS_POSTGRES_PORT'),
        username: config.get<string>('USERS_POSTGRES_USER'),
        password: config.get<string>('USERS_POSTGRES_PASSWORD'),
        database: config.get<string>('USERS_POSTGRES_DB'),
        autoLoadEntities: true,
        synchronize: config.get<string>('NODE_ENV') === 'development',
        logging: config.get<string>('NODE_ENV') === 'development',
        //entities: [__dirname + '/**/entities/*.entity.{ts,js}'],
        cache: { duration: config.get<number>('TYPEORM_CACHE_DURATION') }
      }),
    }),
    UsersModule,
  ],
})
export class AppModule {}
