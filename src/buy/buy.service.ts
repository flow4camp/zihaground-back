// buy.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Buy } from './buy.entity';
import { User } from '../user/user.entity';
import Item from '../item/item.entity';

@Injectable()
export class BuyService {
  constructor(
    @InjectRepository(Buy)
    private readonly buyRepository: Repository<Buy>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createBuy(
    itemId: number,
    userId: number,
    itemType: string,
    price: number,
    quantity = 1,
  ): Promise<Buy> {
    const buy = new Buy();
    buy.quantity = quantity;
    buy.itemId = itemId;
    buy.itemType = itemType;
    const user = await this.userRepository.findOne({ where: { id: userId } });
    buy.user = user;
    user.power -= price;
    await this.userRepository.update(userId, user);
    return this.buyRepository.save(buy);
  }

  async getBuysByItemId(itemId: number): Promise<Buy[]> {
    return this.buyRepository.find({
      where: { itemId: itemId },
    });
  }

  async getBuysByUserId(userId: number): Promise<Buy[]> {
    return this.buyRepository.find({
      where: { user: { id: userId } },
    });
  }
}
