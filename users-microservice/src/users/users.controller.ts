import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PaginationParams, USER_PATTERNS } from './utils/types';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @MessagePattern({cmd: USER_PATTERNS.Create})
  async create(@Payload() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @MessagePattern({cmd:USER_PATTERNS.FindAll})
  async findAll(@Payload() paginationParams: PaginationParams) {
    return this.usersService.findAll(paginationParams);
  }

  @MessagePattern({cmd:USER_PATTERNS.FindOne})
  async findOne(@Payload() payload: { id: number }) {
    return this.usersService.findOne(payload.id);
  }

  @MessagePattern({cmd:USER_PATTERNS.FindByEmail})
  async findByEmail(@Payload() payload: { email: string }) {
    return this.usersService.findByEmail(payload.email);
  }

  @MessagePattern({cmd:USER_PATTERNS.Update})
  async update(@Payload() updateUserDto: UpdateUserDto) {
    return this.usersService.update(updateUserDto.id, updateUserDto);
  }

  @MessagePattern({cmd:USER_PATTERNS.Remove})
  async remove(@Payload() payload: { id: number }) {
    return this.usersService.remove(payload.id);
  }
}
