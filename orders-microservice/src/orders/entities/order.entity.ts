import { BaseEntity, Column, Entity } from "typeorm";

@Entity('orders') 
export class Order extends BaseEntity {
    @Column()
    userId: number;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    totalPrice: number;
}
