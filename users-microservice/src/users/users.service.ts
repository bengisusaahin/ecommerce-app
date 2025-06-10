import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '@ecommerce/types';
import { UpdateUserDto } from '@ecommerce/types';
import { PaginatedResult, PaginationParams, SortOrder } from '@ecommerce/types';
import { UserDto, UserResponseDto } from '@ecommerce/types';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { RpcException } from '@nestjs/microservices';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }

  async create(createUserDto: CreateUserDto): Promise<UserResponseDto> {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const newUser = new User({
      ...createUserDto,
      password: hashedPassword,
    });

    const savedUser = await this.userRepository.save(newUser);

    return plainToInstance(UserResponseDto, savedUser, {
      excludeExtraneousValues: true,
    });
  }

  async findAll(
    params: PaginationParams
  ): Promise<PaginatedResult<UserResponseDto>> {
    const { page = 1, sort = 'id', order = 'asc', limit = 10 } = params;

    const [users, total] = await this.userRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: {
        [sort]: order.toUpperCase() as SortOrder,
      },
    });

    const data = plainToInstance(UserResponseDto, users, {
      excludeExtraneousValues: true,
    });

    return {
      data,
      total,
      page,
      limit,
    };
  }

  async findOne(id: number): Promise<UserResponseDto> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new RpcException({
        status: 'error',
        message: `User with ID ${id} not found`
      });
    }
    const userResponse = new UserResponseDto({
      id: user.id,
      name: user.name,
      email: user.email,
      birthdate: user.birthdate,
      role: user.role,
    });
    return userResponse;
  }

  async findByEmail(email: string): Promise<UserDto> {
    const user = await this.userRepository.findOneBy({ email });
    if (!user) {
      throw new RpcException({
        status: 'error',
        message: `User with email ${email} not found`
      });
    }
    return user
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<UserResponseDto> {
    const user = await this.userRepository.preload({
      id,
      ...updateUserDto,
    });

    if (!user) {
      throw new RpcException({
        status: 'error',
        message: `User with ID ${id} not found`
      });
    }

    const updatedUser = await this.userRepository.save(user);
    return plainToInstance(UserResponseDto, updatedUser, {
      excludeExtraneousValues: true,
    });
  }

  async remove(id: number): Promise<{ message: string }> {
    const result = await this.userRepository.delete(id);
    if (result.affected === 0) {
      throw new RpcException({
        status: 'error',
        message: `User with ID ${id} not found`
      });
    }
    return { message: `User with ID ${id} has been removed` };
  }

}
