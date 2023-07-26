// buy.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import Item from '../item/item.entity';
import { User } from '../user/user.entity';
import { ApiProperty } from '@nestjs/swagger';
import { ItemType } from '../enum/enum';

@Entity()
export class Buy {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ type: Number, description: 'quantity' })
  @Column({ nullable: false, type: 'integer', default: 0 })
  quantity: number;

  @ApiProperty({ type: Number, description: 'item id' })
  @Column({ nullable: false, type: 'integer' })
  itemId: number;

  @ApiProperty({ type: String, description: 'item type' })
  @Column({ nullable: false, type: 'varchar' })
  itemType: string;

  @ManyToOne(() => User, (user) => user.buys)
  user: User;
}
