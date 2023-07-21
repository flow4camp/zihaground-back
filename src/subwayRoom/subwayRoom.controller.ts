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
import { SubwayRoom } from './subwayRoom.entity';
import { SubwayRoomService } from './subwayRoom.service';

@Controller('subwayRoom')
@ApiTags('SubwayRoom')
export class SubwayRoomController {
  constructor(private readonly subwayRoomService: SubwayRoomService) {}

  @Get()
  async findAll(): Promise<SubwayRoom[]> {
    return this.subwayRoomService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<SubwayRoom> {
    return this.subwayRoomService.findByIdWithUsers(id);
  }

  @Post()
  @ApiBody({ type: SubwayRoom })
  async create(@Body() SubwayRoom: SubwayRoom): Promise<SubwayRoom> {
    return this.subwayRoomService.create(SubwayRoom);
  }

  @Put(':id')
  @ApiBody({ type: SubwayRoom })
  async update(
    @Param('id') id: number,
    @Body() SubwayRoom: SubwayRoom,
  ): Promise<SubwayRoom> {
    return this.subwayRoomService.update(id, SubwayRoom);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    return this.subwayRoomService.delete(id);
  }
}
