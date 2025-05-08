import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entity/user.entity';
import { ILike, Repository } from 'typeorm';

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) { }

    async findAll(query: {
        page?: number;
        limit?: number;
        sort?: keyof User;
        order?: 'asc' | 'desc';
        search?: string;
    }): Promise<User[]> {
        const { page = 1, limit = 10, sort = 'id', order = 'asc', search } = query;

        const where = search
            ? [{ name: ILike(`%${search}%`) }, { email: ILike(`%${search}%`) }]
            : undefined;

        return this.userRepository.find({
            where,
            order: { [sort]: order.toUpperCase() as 'ASC' | 'DESC' },
            skip: (page - 1) * limit,
            take: limit,
        });
    }

    async findByEmail(email: string): Promise<User> {
        const user = await this.userRepository.findOne({
            where: { email }
        });

        if (!user) {
            throw new NotFoundException(`User with email ${email} not found`);
        }

        return user;
    }

    async findOne(id: number): Promise<User> {
        const user = await this.userRepository.findOne({ where: { id } });
        if (!user) throw new NotFoundException(`User with id ${id} not found`);
        return user;
    }

    async create(dto: CreateUserDto): Promise<User> {
        const newUser = this.userRepository.create(dto);
        return this.userRepository.save(newUser);
    }

    async update(id: number, dto: UpdateUserDto): Promise<User> {
        const user = await this.findOne(id);
        const updated = Object.assign(user, dto);
        return this.userRepository.save(updated);
    }

    async remove(id: number): Promise<{ message: string }> {
        const result = await this.userRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`User with id ${id} not found`);
        }
        return { message: `User with id ${id} successfully deleted` };
    }
}
