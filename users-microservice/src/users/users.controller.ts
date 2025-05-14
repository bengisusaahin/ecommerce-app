import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { USER_PATTERNS } from './utils/types';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @MessagePattern({cmd: USER_PATTERNS.Create})
  create(@Payload() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @MessagePattern({cmd:USER_PATTERNS.FindAll})
  findAll() {
    return this.usersService.findAll();
  }

  @MessagePattern({cmd:USER_PATTERNS.FindOne})
  findOne(@Payload() id: number) {
    return this.usersService.findOne(id);
  }

  @MessagePattern({cmd:USER_PATTERNS.Update})
  update(@Payload() updateUserDto: UpdateUserDto) {
    return this.usersService.update(updateUserDto.id, updateUserDto);
  }

  @MessagePattern({cmd:USER_PATTERNS.Remove})
  remove(@Payload() id: number) {
    return this.usersService.remove(id);
  }
}
