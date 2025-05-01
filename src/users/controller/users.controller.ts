import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, UseGuards } from '@nestjs/common';
import { UsersService } from '../service/users.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { CapitalizeNamePipe } from 'src/common/pipes/capitalize-name.pipe';
import { SuperAdminGuard } from 'src/auth/guards/super-admin.guard';
import { User } from '../entity/user.entity';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Get()
    getUsers(
        @Query('page') page?: number,
        @Query('limit') limit?: number,
        @Query('sort') sort?: keyof User,
        @Query('order') order?: 'asc' | 'desc',
        @Query('search') search?: string,
    ): Promise<User[]> {
        return this.usersService.findAll({ page, limit, sort, order, search });
    }

    @Get(':id')
    getUserById(@Param('id', ParseIntPipe) id: number): Promise<User> {
        return this.usersService.findOne(id);
    }

    @Post()
    createUser(@Body(CapitalizeNamePipe) createUserDto: CreateUserDto): Promise<User> {
        return this.usersService.create(createUserDto);
    }

    @Put(':id')
    @UseGuards(SuperAdminGuard) 
    updateUser(
        @Param('id', ParseIntPipe) id: number,
        @Body(CapitalizeNamePipe) updateUserDto: UpdateUserDto,
    ): Promise<User> {
        return this.usersService.update(id, updateUserDto);
    }

    @Delete(':id')
    @UseGuards(SuperAdminGuard) 
    deleteUser(@Param('id', ParseIntPipe) id: number): Promise<{ message: string }> {
        return this.usersService.remove(id);
    }
}
