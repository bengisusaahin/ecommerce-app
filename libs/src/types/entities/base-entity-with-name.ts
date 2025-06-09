import { Column } from 'typeorm';
import { BaseEntity } from './base.entity';

export abstract class BaseEntityWithName extends BaseEntity {
    @Column({ type: 'varchar', length: 150})
    name: string;
}
