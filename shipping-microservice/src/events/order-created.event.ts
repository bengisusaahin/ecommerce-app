export class OrderCreatedEvent {
  orderId: number;
  userId: number;
  createdAt: string;  
  items: OrderItem[];
  totalPrice: number;
}

export interface OrderItem {
  productId: number;
  quantity: number;
}
