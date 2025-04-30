import e from "express";
import { OrderItem } from "src/order/entity/order-item.entity";
import { User } from "src/users/entity/user.entity";
import { BaseEntity, Column, Entity, ManyToOne, OneToMany } from "typeorm";

@Entity()
export class Product extends BaseEntity {
  @Column({ type: 'varchar', length: 100, unique: false })
  name: string;

  @Column({ type: 'varchar', length: 200, unique: true })
  description: string;

  @Column({type: 'decimal', precision: 10, scale: 2, unique: false})
  price: number;

  @Column({ type: 'int', default: 0 })
  stock: number;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @ManyToOne(() => User, user => user.productsSold, { nullable: false, eager: true })
  seller: User;

  @OneToMany(() => OrderItem, orderItem => orderItem.product)
  orderItems: OrderItem[];
}