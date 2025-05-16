import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { BaseEntity } from "./base.entity";
import { Order } from "./order.entity";

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

  @ManyToOne(() => Order, order => order.items, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'orderId' })
  order: Order;
}