import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, UseGuards, Request } from '@nestjs/common';
import { UsersService } from '../service/users.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { CapitalizeNamePipe } from 'src/common/pipes/capitalize-name.pipe';
import { User } from '../entity/user.entity';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { UserRole } from '../utils/types';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { OwnerOrRolesGuard } from 'src/auth/guards/owner-or-roles.guard';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Get('me')
    @UseGuards(JwtAuthGuard)
    getMe(@Request() req) {
        return this.usersService.findOne(req.user.id);
    }

    @Get()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.SUPER_ADMIN)
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
    @UseGuards(JwtAuthGuard, OwnerOrRolesGuard)
    @Roles(UserRole.SUPER_ADMIN)
    getUserById(@Param('id', ParseIntPipe) id: number): Promise<User> {
        return this.usersService.findOne(id);
    }

    @Post('register')
    createUser(@Body(CapitalizeNamePipe) createUserDto: CreateUserDto): Promise<User> {
        return this.usersService.create(createUserDto);
    }

    @Put(':id')
    @UseGuards(JwtAuthGuard, OwnerOrRolesGuard)
    @Roles(UserRole.SUPER_ADMIN)
    updateUser(
        @Param('id', ParseIntPipe) id: number,
        @Body(CapitalizeNamePipe) updateUserDto: UpdateUserDto,
    ): Promise<User> {
        return this.usersService.update(id, updateUserDto);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.SUPER_ADMIN)
    deleteUser(@Param('id', ParseIntPipe) id: number): Promise<{ message: string }> {
        return this.usersService.remove(id);
    }
}
