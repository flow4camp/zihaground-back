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

@Entity()
export class SubwayRoom {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ type: String, description: 'subway number' })
  @Column({ nullable: false, type: 'integer' })
  subwayNum: number;

  @OneToMany(() => User, (user) => user.subwayRoom, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  users: User[];

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
