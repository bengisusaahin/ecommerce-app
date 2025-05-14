import { Product } from "src/products/entity/product.entity";
import { Column, Entity, ManyToOne } from "typeorm";
import { BaseEntity } from 'src/common/entity/base.entity';
import { Order } from "./order.entity";

@Entity()
export class OrderItem extends BaseEntity {
    @Column({ type: 'int' })
    quantity: number;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    price: number;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    totalPrice: number;

    @ManyToOne(() => Product, product => product.orderItems, { nullable: false, eager: true })
    product: Product;

    @ManyToOne(() => Order, order => order.orderItems, { nullable: false })
    order: Order;
}