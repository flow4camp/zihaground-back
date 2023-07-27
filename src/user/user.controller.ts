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
  UserNameInput,
  UserGhostInput,
  UserStation1Input,
  UserStation2Input,
  UserStation3Input,
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

  // 유저네임, 유령이름 추가 및 삭제
  @Put(':id/username')
  async updateUsername(
    @Param('id') id: number,
    @Body() input: UserNameInput,
  ): Promise<User> {
    return this.userService.updateUsername(id, input.username);
  }

  @Put(':id/ghostname')
  async updateGhostname(
    @Param('id') id: number,
    @Body() input: UserGhostInput,
  ): Promise<User> {
    return this.userService.updateGhostname(id, input.ghostname);
  }

  // 지하철역 이름, 노선이름 수정
  @Put(':id/station1')
  async updateStation1(
    @Param('id') id: number,
    @Body() input: UserStation1Input,
  ): Promise<User> {
    return this.userService.updateStation1(id, input.station1);
  }
  @Put(':id/station2')
  async updateStation2(
    @Param('id') id: number,
    @Body() input: UserStation2Input,
  ): Promise<User> {
    return this.userService.updateStation2(id, input.station2);
  }
  @Put(':id/station3')
  async updateStation3(
    @Param('id') id: number,
    @Body() input: UserStation3Input,
  ): Promise<User> {
    return this.userService.updateStation3(id, input.station3);
  }
}
