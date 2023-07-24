import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemController } from './item.controller';
import Item from './item.entity';
import { ItemService } from './item.service';
import { Buy } from '../buy/buy.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Item]), TypeOrmModule.forFeature([Buy])],
  controllers: [ItemController],
  providers: [ItemService],
})
export class ItemModule {}
