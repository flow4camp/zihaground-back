import { ApiProperty } from '@nestjs/swagger';
import { User } from '../user/user.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Buy } from '../buy/buy.entity';

@Entity()
export default class Item {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ type: String, description: 'item name' })
  @Column({ nullable: false, type: 'varchar' })
  name: string;

  @ApiProperty({ type: String, description: 'item type' })
  @Column({ nullable: false, type: 'varchar' })
  type: string;

  @ApiProperty({ type: Number, description: 'item price' })
  @Column({ nullable: false, type: 'integer', default: 0 })
  price: number;

  @ApiProperty({ type: String, description: 'item image url' })
  @Column({ nullable: false, type: 'varchar' })
  imageUrl: string;

  @ApiProperty({ type: Number, description: 'item buy count' })
  @Column({ nullable: false, type: 'integer', default: 0 })
  count: number;

  @ManyToMany(() => Buy, (buy) => buy.item)
  @JoinTable()
  buys: Buy[];
}
