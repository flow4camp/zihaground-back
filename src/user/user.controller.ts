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
import {
  UserUpdateInput,
  UserCreateInput,
  UserRecordInput,
  UserLoginInput,
  UserEditInput,
  UserPowerInput,
} from './dto/user.input';
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

  @Post('login')
  @ApiBody({ type: UserLoginInput })
  async userLogin(@Body() user: UserLoginInput): Promise<User> {
    return this.userService.login(user);
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

  @Put('/character/:id')
  @ApiBody({ type: UserEditInput })
  async edit(
    @Param('id') id: number,
    @Body() User: UserEditInput,
  ): Promise<User> {
    return this.userService.edit(id, User);
  }

  @Put('/add-power/:id')
  @ApiBody({ type: UserPowerInput })
  async addPower(
    @Param('id') id: number,
    @Body() input: UserPowerInput,
  ): Promise<User> {
    return this.userService.addPower(id, input.power);
  }

  @Put('/add-record/:id')
  @ApiBody({ type: UserRecordInput })
  async addRecord(
    @Param('id') id: number,
    @Body() userRecord: UserRecordInput,
  ): Promise<User> {
    return this.userService.addRecord(id, userRecord.score);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    return this.userService.delete(id);
  }
}
