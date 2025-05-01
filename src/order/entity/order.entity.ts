import { User } from "src/users/entity/user.entity";
import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { BaseEntity } from 'src/common/entity/base.entity';
import { OrderItem } from "./order-item.entity";

@Entity()
export class Order extends BaseEntity {
    @Column({ type: 'decimal', precision: 10, scale: 2 })
    totalPrice: number;

    @ManyToOne(() => User, user => user.orders, { nullable: false, eager: true })
    user: User;

    @OneToMany(() => OrderItem, orderItem => orderItem.order, {
        cascade: ['insert', 'update'],
    })
    orderItems: OrderItem[];
}