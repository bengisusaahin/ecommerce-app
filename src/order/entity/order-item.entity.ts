import { Product } from "src/products/entity/product.entity";
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Order } from "./order.entity";

@Entity()
export class OrderItem extends BaseEntity{
  @Column()
  quantity: number;

  @Column('decimal')
  price: number;

  @Column('decimal')
  totalPrice: number;

  @ManyToOne(() => Product, product => product.orderItems)
  product: Product;

  @ManyToOne(() => Order, order => order.orderItems)
  order: Order;
}