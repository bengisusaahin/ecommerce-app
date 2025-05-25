export const KAFKA_PATTERNS = {
  name: 'KAFKA_PRODUCER',
  host: 'kafka',
  port: 9092,
}

export const STOCK_PATTERNS = {
  ORDER_CREATED: 'Order.Created',
  ORDER_STOCK_CREATED: 'Order.Stock.Created',
  STOCK_WARNING: 'Stock.Warning',
  STOCK_ERROR: 'Stock.Error'
};

export const PRODUCT_PATTERNS = {
  DecreaseStock: 'Products.DecreaseStock',
};
