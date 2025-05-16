import { Column, Entity, OneToMany } from "typeorm";
import { BaseEntity } from "./base.entity";
import { OrderItem } from "./order-item.entity";

@Entity('orders')
export class Order extends BaseEntity {
    @Column()
    userId: number;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    totalPrice: number;

    @OneToMany(() => OrderItem, (orderItem) => orderItem.order, {
        onDelete: 'CASCADE',
    })
    items: OrderItem[];

}
