import { Injectable, Inject, Logger } from '@nestjs/common';
import { ClientKafka, ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { KAFKA_PATTERNS, PRODUCT_PATTERNS, STOCK_PATTERNS } from './util/types';

interface OrderItem {
  productId: number;
  quantity: number;
}

@Injectable()
export class StockService {
  private readonly logger = new Logger(StockService.name);

  constructor(
    @Inject('PRODUCTS_MICROSERVICE')
    private readonly productsClient: ClientProxy,
    @Inject(KAFKA_PATTERNS.name)
    private readonly kafkaClient: ClientKafka,
  ) {}

  async decreaseStock(orderItems: OrderItem[]) {
    for (const item of orderItems) {
      try {
        const result = await firstValueFrom(
          this.productsClient.send({ cmd: PRODUCT_PATTERNS.DecreaseStock }, item),
        );

        if (result?.warning) {
          this.logger.warn(`Insufficient stock for product ${item.productId}`);
          
          await this.kafkaClient.emit(STOCK_PATTERNS.STOCK_WARNING, {
            productId: item.productId,
            requiredQuantity: item.quantity,
            availableQuantity: result.currentStock,
            message: 'Stock level is too low'
          });
        }

        this.logger.log(`Stock updated for product ${item.productId}`);
      } catch (error) {
        this.logger.error(`Error updating stock for product ${item.productId}: ${error.message}`);
        
        await this.kafkaClient.emit(STOCK_PATTERNS.STOCK_ERROR, {
          productId: item.productId,
          error: error.message
        });
      }
    }
  }
}
