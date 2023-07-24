// buy.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import Item from '../item/item.entity';
import { User } from '../user/user.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Buy {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ type: Number, description: 'quantity' })
  @Column({ nullable: false, type: 'integer', default: 0 })
  quantity: number;

  @ManyToOne(() => Item, (item) => item.buys)
  item: Item;

  @ManyToOne(() => User, (user) => user.buys)
  user: User;
}
