import e from "express";
import { OrderItem } from "src/order/entity/order-item.entity";
import { User } from "src/users/entity/user.entity";
import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Product extends BaseEntity {
  @Column()
  name: string;

  @Column()
  description: string;

  @Column('decimal')
  price: number;

  @Column()
  stock: number;

  @Column({ default: true })
  isActive: boolean;

  @ManyToOne(() => User, user => user.productsSold)
  seller: User;

  @OneToMany(() => OrderItem, orderItem => orderItem.product)
  orderItems: OrderItem[];
}