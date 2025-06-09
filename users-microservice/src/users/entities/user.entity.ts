import { Entity, Column, OneToMany } from 'typeorm';
import { BaseEntityWithName } from '@ecommerce/types';
import { UserRole } from '@ecommerce/types';

@Entity('users')
export class User extends BaseEntityWithName {
    @Column({ type: 'varchar', length: 100, unique: true })
    email: string;

    @Column({ type: 'varchar', length: 100, unique: false })
    password: string;

    @Column({ name: 'is_active', type: 'boolean', default: true })
    isActive: boolean;

    @Column({ type: 'date' })
    birthdate: Date;

    @Column({ type: 'enum', enum: UserRole, default: UserRole.USER })
    role: UserRole;

    constructor(userDTO: Partial<User>) {
        super();
        Object.assign(this, { ...userDTO });
    }
}