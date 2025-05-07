import { OrderItem } from "src/order/entity/order-item.entity";
import { User } from "src/users/entity/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { BaseEntity } from 'src/common/entity/base.entity';
import { ProductImage } from "./product-image.entity";

@Entity('products')
export class Product extends BaseEntity {
  @Column({ type: 'varchar', length: 100, unique: false })
  name: string;

  @Column({ type: 'varchar', length: 200, unique: true })
  description: string;

  @Column({type: 'decimal', precision: 10, scale: 2, unique: false})
  price: number;

  @Column({ type: 'int', default: 0 })
  stock: number;

  @Column({ name: 'is_active', type: 'boolean', default: false })
  isActive: boolean;

  @Column({ name: 'is_deleted', type: 'boolean', default: false })
  isDeleted: boolean;

  @ManyToOne(() => User, (user) => user.productsSold, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'seller_id' })
  seller: User;

  @OneToMany(() => ProductImage, (img) => img.product, { cascade: true })
  images: ProductImage[];

  @OneToMany(() => OrderItem, orderItem => orderItem.product)
  orderItems: OrderItem[];
}