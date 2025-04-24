import { Injectable } from '@nestjs/common';
import { UserType } from '../utils/types';
import { dummyUsers } from 'src/data/DummyData';

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
}
