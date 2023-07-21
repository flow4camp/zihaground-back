import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { UserUpdateInput, UserCreateInput } from './dto/user.input';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('user')
@ApiTags('User')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<User> {
    return this.userService.findByIdWithRoom(id);
  }

  @Post()
  @ApiBody({ type: UserCreateInput })
  async create(@Body() User: UserCreateInput): Promise<User> {
    return this.userService.create(User);
  }

  @Put(':id')
  @ApiBody({ type: UserUpdateInput })
  async update(
    @Param('id') id: number,
    @Body() User: UserUpdateInput,
  ): Promise<User> {
    return this.userService.update(id, User);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    return this.userService.delete(id);
  }
}
