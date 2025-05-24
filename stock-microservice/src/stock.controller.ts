import { Controller, Get } from '@nestjs/common';
import { StockService } from './stock.service';

@Controller()
export class StockController {
  constructor(private readonly appService: StockService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
