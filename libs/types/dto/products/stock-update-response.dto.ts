import { Expose } from 'class-transformer';

export class StockUpdateResponseDto {
  @Expose()
  success?: boolean;

  @Expose()
  warning?: boolean;

  @Expose()
  currentStock?: number;

  constructor(partial: Partial<StockUpdateResponseDto>) {
    Object.assign(this, partial);
  }

  static success(): StockUpdateResponseDto {
    return new StockUpdateResponseDto({ success: true });
  }

  static warning(currentStock: number): StockUpdateResponseDto {
    return new StockUpdateResponseDto({ warning: true, currentStock });
  }
}
