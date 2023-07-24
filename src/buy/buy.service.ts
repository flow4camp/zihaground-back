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
    @InjectRepository(Item)
    private readonly itemRepository: Repository<Item>,
  ) {}

  async createBuy(itemId: number, userId: number, quantity = 1): Promise<Buy> {
    const buy = new Buy();
    buy.quantity = quantity;

    const item = await this.itemRepository.findOne({ where: { id: itemId } });
    buy.item = item;

    const user = await this.userRepository.findOne({ where: { id: userId } });
    buy.user = user;

    return this.buyRepository.save(buy);
  }

  async getBuysByItemId(itemId: number): Promise<Buy[]> {
    return this.buyRepository.find({
      where: { item: { id: itemId } },
      relations: ['item', 'user'],
    });
  }

  async getBuysByUserId(userId: number): Promise<Buy[]> {
    return this.buyRepository.find({
      where: { user: { id: userId } },
      relations: ['item', 'user'],
    });
  }
}
