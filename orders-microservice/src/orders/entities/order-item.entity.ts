import { BaseEntity, Column, Entity } from "typeorm";

@Entity('order_items')
export class OrderItem extends BaseEntity {
  @Column()
  orderId: number;

  @Column()
  productId: number;

  @Column({ type: 'int' })
  quantity: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  totalPrice: number;
}