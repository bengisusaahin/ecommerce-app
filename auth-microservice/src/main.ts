import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const appContext = await NestFactory.createApplicationContext(AppModule);
  const configService = appContext.get(ConfigService);

  const host = configService.get<string>('AUTH_HOST');
  const port = configService.get<number>('AUTH_PORT');

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
      options: { 
        host, 
        port 
      },
    },
  );

  await app.listen();
  console.log(`Auth Microservice running on ${host}:${port}`);
}
bootstrap();

