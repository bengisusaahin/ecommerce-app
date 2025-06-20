import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UsersService } from './users.service';
import { CreateUserDto } from '@ecommerce/types';
import { UpdateUserDto } from '@ecommerce/types';
import { PaginationParams, USER_PATTERNS } from '@ecommerce/types';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @MessagePattern({ cmd: USER_PATTERNS.Create })
  async create(@Payload() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @MessagePattern({ cmd: USER_PATTERNS.FindAll })
  async findAll(@Payload() paginationParams: PaginationParams) {
    return this.usersService.findAll(paginationParams);
  }

  @MessagePattern({ cmd: USER_PATTERNS.FindOne })
  async findOne(@Payload() payload: { id: number }) {
    return this.usersService.findOne(payload.id);
  }

  @MessagePattern({ cmd: USER_PATTERNS.FindByEmail })
  async findByEmail(@Payload() payload: { email: string }) {
    return this.usersService.findByEmail(payload.email);
  }

  @MessagePattern({ cmd: USER_PATTERNS.Update })
  async update(@Payload() updatePayload: { id: number; updateUserDto: UpdateUserDto }) {
    return this.usersService.update(updatePayload.id, updatePayload.updateUserDto);
  }

  @MessagePattern({ cmd: USER_PATTERNS.Remove })
  async remove(@Payload() payload: { id: number }) {
    return this.usersService.remove(payload.id);
  }
}
