import { Column, Entity, OneToMany } from "typeorm";
import { BaseEntity } from "./base.entity";
import { OrderItem } from "./order-item.entity";

@Entity('orders')
export class Order extends BaseEntity {
    @Column({ name: 'user_id' , type: 'int' })
    userId: number;

    @Column({ name: 'total_price', type: 'decimal', precision: 10, scale: 2 })
    totalPrice: number;

    @OneToMany(() => OrderItem, (orderItem) => orderItem.order, {
        onDelete: 'CASCADE',
    })
    items: OrderItem[];

    constructor(dto: Partial<Order>) {
        super();
        Object.assign(this, { ...dto });
    }
}
