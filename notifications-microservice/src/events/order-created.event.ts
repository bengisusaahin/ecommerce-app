export class OrderCreatedEvent {
  orderId: number;
  userId: number;
  createdAt: string;
  items: { productId: number; quantity: number }[];
  totalPrice: number;
}