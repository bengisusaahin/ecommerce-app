import { Order } from "src/order/entity/order.entity";
import { Product } from "src/products/entity/product.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

  
  @Entity()
  export class User {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    name: string;
  
    @Column({ unique: true })
    email: string;
  
    @Column()
    password: string;
  
    @Column({ default: true })
    isActive: boolean;
  
    @Column({ type: 'date' })
    birthdate: Date;
  
    @Column()
    role: string;
  
    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
  
    @OneToMany(() => Order, order => order.user)
    orders: Order[];
  
    @OneToMany(() => Product, product => product.seller)
    productsSold: Product[];
  }
  