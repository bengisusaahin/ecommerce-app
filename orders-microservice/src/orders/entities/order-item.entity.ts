import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { BaseEntity } from '@ecommerce/types';
import { Order } from "./order.entity";

@Entity('order_items')
export class OrderItem extends BaseEntity {
  //TODO
  @Column()
  orderId: number;

  @Column({ name: 'product_id', type: 'int' })
  productId: number;

  @Column({ type: 'int', default: 1 })
  quantity: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column({ name: 'total_price', type: 'decimal', precision: 10, scale: 2 })
  totalPrice: number;

  @ManyToOne(() => Order, order => order.items, {
    eager: true,
    onDelete: 'CASCADE'
  })
  @JoinColumn({ name: 'order_id' })
  order: Order;

  constructor(dto: Partial<OrderItem>) {
    super();
    Object.assign(this, { ...dto });
  }
}