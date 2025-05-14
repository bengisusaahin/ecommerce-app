import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ClientProxy } from '@nestjs/microservices';
import { PaginationParams, USER_PATTERNS } from './utils/types';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USERS_MICROSERVICE')
    private readonly usersMicroservice: ClientProxy,
  ) { }

  create(createUserDto: CreateUserDto) {
    return this.usersMicroservice.send({ cmd: USER_PATTERNS.Create },
      createUserDto);
  }

  findAll({ page = 1, sort = 'id', order = 'ASC', limit = 10 }: PaginationParams) {
    return this.usersMicroservice.send(
      { cmd: USER_PATTERNS.FindAll },
      { page, sort, order, limit },
    )
  }

  findOne(id: number) {
    return this.usersMicroservice.send({ cmd: USER_PATTERNS.FindOne }, { id });
  }

  findByEmail(email: string) {
    return this.usersMicroservice.send({ cmd: USER_PATTERNS.FindByEmail }, { email });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.usersMicroservice.send(
      { cmd: USER_PATTERNS.Update },
      { id, ...updateUserDto },
    );
  }

  remove(id: number) {
    return this.usersMicroservice.send(
      { cmd: USER_PATTERNS.Remove },
      { id },
    );
  }
}
