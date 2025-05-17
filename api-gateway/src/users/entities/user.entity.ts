import { BaseEntity } from "src/common/entity/base.entity";
import { UserRole } from "src/products/utils/types";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('users')
export class User extends BaseEntity {
    @Column({ type: 'varchar', length: 150, unique: false })
    name: string;

    @Column({ type: 'varchar', length: 150, unique: true })
    email: string;

    @Column({ type: 'varchar', length: 100, unique: false })
    password: string;

    @Column({ type: 'timestamp', nullable: true })
    birthdate: Date;

    @Column({ name: 'is_active', type: 'boolean', unique: false, default: true })
    isActive: boolean;

    @Column({ type: 'enum', enum: UserRole, default: UserRole.USER })
    role: UserRole;

    constructor(dto: Partial<User>) {
        super();
        Object.assign(this, { ...dto });
    }
}
