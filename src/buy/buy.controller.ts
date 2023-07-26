// buy.controller.ts
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { BuyService } from './buy.service';
import { Buy } from './buy.entity';
import { CreateBuyDto } from './dto/buy.input';
import { ApiTags } from '@nestjs/swagger';

@Controller('buy')
@ApiTags('Buy')
export class BuyController {
  constructor(private readonly buyService: BuyService) {}

  @Get('item/:itemId')
  async getBuysByItemId(@Param('itemId') itemId: number): Promise<Buy[]> {
    return this.buyService.getBuysByItemId(itemId);
  }

  @Get('user/:userId')
  async getBuysByUserId(@Param('userId') userId: number): Promise<Buy[]> {
    return this.buyService.getBuysByUserId(userId);
  }
  @Post()
  async createBuy(@Body() createBuyDto: CreateBuyDto): Promise<Buy> {
    return this.buyService.createBuy(
      createBuyDto.itemId,
      createBuyDto.userId,
      createBuyDto.itemType,
      createBuyDto.price,
    );
  }
}
