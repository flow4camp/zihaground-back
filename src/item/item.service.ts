import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import Item from './item.entity';
import { ItemType } from '../enum/enum';

@Injectable()
export class ItemService {
  constructor(
    @InjectRepository(Item)
    private itemRepository: Repository<Item>,
  ) {}

  async findAll(): Promise<Item[]> {
    return await this.itemRepository.find();
  }

  async findById(id: number): Promise<Item> {
    return await this.itemRepository.findOne({
      where: { id: id },
    });
  }

  async findByName(name: string): Promise<Item[]> {
    return await this.itemRepository.find({
      where: { name: Like(`%${name}%`) },
    });
  }

  async findByType(type: ItemType): Promise<Item[]> {
    return await this.itemRepository.find({
      where: { type: type },
    });
  }

  async create(Item: Item): Promise<Item> {
    return await this.itemRepository.save({
      ...Item,
    });
  }

  async update(id: number, Item: Item): Promise<Item> {
    try {
      await this.itemRepository.update(id, Item);
    } catch (e) {
      console.log(e);
    }
    return await this.itemRepository.findOne({
      where: { id: id },
    });
  }

  async delete(id: number): Promise<void> {
    const Item = await this.itemRepository.findOne({
      where: { id: id },
    });
    if (Item) {
      await this.itemRepository.update(id, Item);
    }
  }
}
