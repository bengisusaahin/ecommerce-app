import { Column, Entity, JoinColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity('product_images')
export class ProductImage {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'product_id', type: 'int' })
    productId: number;

    @Column({ type: 'varchar', length: 255 })
    url: string;

    @Column({ type: 'int', default: 0 })
    index: number;
}