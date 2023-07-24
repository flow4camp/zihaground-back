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
import item from './item.entity';
import { ItemService } from './item.service';
import Item from './item.entity';

@Controller('item')
@ApiTags('Item')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Get()
  async findAll(): Promise<Item[]> {
    return this.itemService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Item> {
    return this.itemService.findById(id);
  }

  @Get('name/:name')
  async findByName(@Param('name') name: string): Promise<Item[]> {
    return this.itemService.findByName(name);
  }
  @Get('type/:type')
  async findByType(@Param('name') name: string): Promise<Item[]> {
    return this.itemService.findByType(name);
  }

  @Post()
  @ApiBody({ type: item })
  async create(@Body() item: Item): Promise<Item> {
    return this.itemService.create(item);
  }

  @Put(':id')
  @ApiBody({ type: item })
  async update(@Param('id') id: number, @Body() item: Item): Promise<Item> {
    return this.itemService.update(id, item);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    return this.itemService.delete(id);
  }
}
