// buy.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Buy } from './buy.entity';
import { BuyService } from './buy.service';
import Item from '../item/item.entity';
import { User } from '../user/user.entity';
import { BuyController } from './buy.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Buy]), TypeOrmModule.forFeature([User])],
  controllers: [BuyController],
  providers: [BuyService],
  exports: [BuyService],
})
export class BuyModule {}
