import { Order } from "src/order/entity/order.entity";
import { Product } from "src/products/entity/product.entity";
import { BaseEntity, Column, Entity, OneToMany } from "typeorm";
import { UserRole } from "../utils/types";

  
  @Entity()
  export class User extends BaseEntity {  
    @Column({ type: 'varchar', length: 100, unique: false })
    name: string;
  
    @Column({ type: 'varchar', length: 100, unique: true })
    email: string;
  
    @Column({ type: 'varchar', length: 100, unique: false })
    password: string;
  
    @Column({ type: 'boolean', default: true })
    isActive: boolean;
  
    @Column({ type: 'date' })
    birthdate: Date;
  
    @Column({ type: 'int', default: UserRole.USER })
    role: UserRole;
  
    @OneToMany(() => Order, order => order.user)
    orders: Order[];
  
    @OneToMany(() => Product, product => product.seller)
    productsSold: Product[];
  }
  