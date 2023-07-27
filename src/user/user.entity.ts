import { ApiProperty } from '@nestjs/swagger';
import { SubwayRoom } from '../subwayRoom/subwayRoom.entity';
import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  ManyToMany,
} from 'typeorm';
import Item from '../item/item.entity';
import { Buy } from '../buy/buy.entity';

export enum UserType {
  user = 0,
  admin = 1,
}

@Entity()
export class User {
  @ApiProperty({ type: Number, description: 'id' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ type: String, description: 'username' })
  @Column({ nullable: false, type: 'varchar' })
  username: string;

  //유령이름
  @ApiProperty({ type: String, description: 'ghostname' })
  @Column({ nullable: false, type: 'varchar', default: '유령이' })
  ghostname: string;

  @ApiProperty({ type: String, description: 'password' })
  @Column({ nullable: false, type: 'varchar' })
  password: string;

  @ApiProperty({ type: String, description: 'email' })
  @Column({ nullable: false, type: 'varchar' })
  email: string;

  @ApiProperty({ type: Number, description: 'subwayNum' })
  @Column({ nullable: true, type: 'integer' })
  subwayNum: number;

  @ApiProperty({ type: Number, description: 'power' })
  @Column({ nullable: false, type: 'integer', default: 1000 })
  power: number;

  @ApiProperty({ type: Number, description: 'win' })
  @Column({ nullable: false, type: 'integer', default: 0 })
  win: number;

  @ApiProperty({ type: Number, description: 'lose' })
  @Column({ nullable: false, type: 'integer', default: 0 })
  lose: number;

  @ApiProperty({ type: Number, description: 'hatVariants' })
  @Column({ nullable: false, type: 'integer', default: -1 })
  hatVariants: number;

  @ApiProperty({ type: Number, description: 'faceVariants' })
  @Column({ nullable: false, type: 'integer', default: -1 })
  faceVariants: number;

  @ApiProperty({ type: Number, description: 'accVariants' })
  @Column({ nullable: false, type: 'integer', default: -1 })
  accVariants: number;

  @ApiProperty({ type: Number, description: 'clothesVariants' })
  @Column({ nullable: false, type: 'integer', default: -1 })
  clothesVariants: number;

  @ApiProperty({ type: Number, description: 'shoeVariants' })
  @Column({ nullable: false, type: 'integer', default: -1 })
  shoeVariants: number;

  @ManyToOne(() => SubwayRoom, (room) => room.users, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  subwayRoom: SubwayRoom;

  @ApiProperty({ type: Number, description: 'type' })
  @Column({ nullable: true, type: 'integer', default: 0 })
  type: UserType;

  @ManyToMany(() => Buy, (buy) => buy.user)
  buys: Buy[];

  @CreateDateColumn({ type: 'timestamp' })
  @Column({ default: null, nullable: true })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  @Column({ default: null, nullable: true })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp' })
  @Column({ default: null, nullable: true })
  deletedAt: Date;

  // 지하철 수정

  @ApiProperty({ type: Number, description: 'subwayNum1' })
  @Column({ nullable: true, type: 'integer', default: 3 })
  subwayNum1: number;

  @ApiProperty({ type: Number, description: 'subwayNum2' })
  @Column({ nullable: true, type: 'integer', default: 4 })
  subwayNum2: number;

  @ApiProperty({ type: String, description: 'station1' })
  @Column({ nullable: true, type: 'varchar', default: '대전역' })
  station1: string;

  @ApiProperty({ type: String, description: 'station2' })
  @Column({ nullable: true, type: 'varchar', default: '대전역' })
  station2: string;

  @ApiProperty({ type: String, description: 'station3' })
  @Column({ nullable: true, type: 'varchar', default: '대전역' })
  station3: string;

  @ApiProperty({ type: String, description: 'firsttime' })
  @Column({ nullable: true, type: 'varchar', default: '08:00' })
  firsttime: string;
  @ApiProperty({ type: String, description: 'secondtime' })
  @Column({ nullable: true, type: 'varchar', default: '08:30' })
  secondtime: string;
  @ApiProperty({ type: String, description: 'thirdtime' })
  @Column({ nullable: true, type: 'varchar', default: '09:30' })
  thirdtime: string;
}
