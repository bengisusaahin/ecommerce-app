import { Injectable, NotFoundException } from '@nestjs/common';
import { UserType } from '../utils/types';
import { dummyUsers } from 'src/data/DummyData';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

@Injectable()
export class UsersService {

    private users: UserType[] = dummyUsers;

    findAll(query: {
        page?: number;
        limit?: number;
        sort?: keyof UserType;
        order?: 'asc' | 'desc';
    }): UserType[] {
        const { page = 1, limit = 10, sort = 'id', order = 'asc' } = query;

        const sorted = [...this.users].sort((a, b) => {
            if (order === 'asc') return a[sort] > b[sort] ? 1 : -1;
            else return a[sort] < b[sort] ? 1 : -1;
        });

        const start = (page - 1) * limit;
        const end = start + limit;
        return sorted.slice(start, end);
    }

    findOne(id: number): UserType {
        const user = this.users.find((user) => user.id === id);
        if (!user) throw new NotFoundException(`User with id ${id} not found`);
        return user;
    }

    create(dto: CreateUserDto): UserType {
        const newUser: UserType = {
            id: Math.max(...this.users.map(user => user.id)) + 1,
            ...dto,
        };

        this.users.push(newUser);
        return newUser;
    }

    update(id: number, dto: UpdateUserDto): UserType {
        const userIndex = this.users.findIndex((user) => user.id === id);
        if (userIndex === -1) throw new NotFoundException(`User with id ${id} not found`);

        const updatedUser = { ...this.users[userIndex], ...dto };
        this.users[userIndex] = updatedUser;
        return updatedUser;
    }
}
