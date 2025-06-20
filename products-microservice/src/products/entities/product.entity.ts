import { Column, Entity, OneToMany } from "typeorm";
import { BaseEntityWithName } from '@ecommerce/types';
import { ProductImage } from "./product-image.entity";

@Entity('products')
export class Product extends BaseEntityWithName {
    @Column({ type: 'varchar', length: 200, unique: true })
    description: string;

    @Column({ type: 'decimal', precision: 10, scale: 2, unique: false })
    price: number;

    @Column({ type: 'int', default: 0 })
    stock: number;

    @Column({ name: 'is_active', type: 'boolean', default: false })
    isActive: boolean;

    @Column({ name: 'is_deleted', type: 'boolean', default: false })
    isDeleted: boolean;

    @Column({ name: 'seller_id', type: 'int' })
    sellerId: number;

    @OneToMany(() => ProductImage, (productImage) => productImage.product, {
        cascade: true,
        eager: true,
    })
    images: ProductImage[];
}
