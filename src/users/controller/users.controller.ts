import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { UsersService } from '../service/users.service';
import { UserType } from '../utils/types';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get()
    getUsers(
      @Query('page') page?: number,
      @Query('limit') limit?: number,
      @Query('sort') sort?: keyof UserType,
      @Query('order') order?: 'asc' | 'desc',
    ): UserType[] {
      return this.usersService.findAll({ page, limit, sort, order });
    }

    @Get(':id')
    getUserById(@Param('id', ParseIntPipe) id: number): UserType {
      return this.usersService.findOne(id);
    }
  }
