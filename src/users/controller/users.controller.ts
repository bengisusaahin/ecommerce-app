import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { UsersService } from '../service/users.service';
import { UserType } from '../utils/types';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { CapitalizeNamePipe } from 'src/common/pipes/capitalize-name.pipe';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

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

    @Post()
    createUser(@Body(CapitalizeNamePipe) createUserDto: CreateUserDto): UserType {
        return this.usersService.create(createUserDto);
    }

    @Put(':id')
    updateUser(
        @Param('id', ParseIntPipe) id: number,
        @Body(CapitalizeNamePipe) updateUserDto: UpdateUserDto,
    ): UserType {
        return this.usersService.update(id, updateUserDto);
    }

    @Delete(':id')
    deleteUser(@Param('id', ParseIntPipe) id: number): void {
        return this.usersService.remove(id);
    }
}
