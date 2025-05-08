import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { getConnectionToken } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

@Injectable()
export class AppService implements OnModuleDestroy {
  constructor(
    @Inject(getConnectionToken()) private readonly mongoConn: Connection,
  ) {}

  onModuleDestroy() {
    return this.mongoConn.close();
  }

  getHello(): string {
    return 'Hello World!';
  }
}
