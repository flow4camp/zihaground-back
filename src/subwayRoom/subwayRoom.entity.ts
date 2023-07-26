import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../user/user.entity';
import { Socket } from 'socket.io';

@Entity()
export class SubwayRoom {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ type: String, description: 'subway number' })
  @Column({ nullable: false, type: 'varchar' })
  subwayNum: string;

  @OneToMany(() => User, (user) => user.subwayRoom, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  users: User[];

  @ApiProperty({ type: Number, description: 'first user Hp' })
  @Column({ nullable: false, type: 'integer', default: 100 })
  firHp: number;

  @ApiProperty({ type: Number, description: 'second user Hp' })
  @Column({ nullable: false, type: 'integer', default: 100 })
  secHp: number;

  firSocket?: Socket;
  secSocket?: Socket;

  @ApiProperty({ type: Number, description: 'turn' })
  @Column({ nullable: false, type: 'integer', default: 0 })
  turn: number;

  firSelect?: number;
  secSelect?: number;

  @CreateDateColumn({ type: 'timestamp' })
  @Column({ default: null, nullable: true })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  @Column({ default: null, nullable: true })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp' })
  @Column({ default: null, nullable: true })
  deletedAt: Date;
}
