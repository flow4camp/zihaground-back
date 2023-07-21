import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SubwayRoomService } from '../subwayRoom/subwayRoom.service';
import { UserCreateInput, UserUpdateInput } from './dto/user.input';
import { User } from './user.entity';
import e from 'express';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private readonly subwayRoomService: SubwayRoomService,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.userRepository.find({
      where: { deletedAt: null },
    });
  }

  async findById(id: number): Promise<User> {
    return await this.userRepository.findOne({
      where: { id: id },
    });
  }

  async findByIdWithRoom(id: number): Promise<User> {
    const answer = await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.subwayRoom', 'subwayRoom')
      .where('user.id = :id', { id })
      .andWhere('user.deletedAt IS NULL')
      .getOne();
    return answer;
  }

  async findByUsername(username: string): Promise<User> {
    return await this.userRepository.findOne({
      where: { username: username },
    });
  }

  async create(userInput: UserCreateInput): Promise<User> {
    const existUser = await this.userRepository.findOne({
      where: { username: userInput.username },
    });
    if (existUser) {
      throw new Error('This token has already been added.');
    }
    return await this.userRepository.save({
      createdAt: new Date(),
      ...userInput,
    });
  }

  async update(id: number, user: UserUpdateInput): Promise<User> {
    try {
      const existUser = await this.userRepository.findOne({
        where: { id: id },
      });
      if (!existUser) {
        throw new Error('User not found');
      }
      existUser.username = user.username;
      existUser.subwayNum = user.subwayNum;
      existUser.email = user.email;
      existUser.password = user.password;
      existUser.type = user.type;
      if (user.subwayRoomId) {
        const subwayRoom = await this.subwayRoomService.findById(
          user.subwayRoomId,
        );
        if (!subwayRoom) {
          throw new Error('SubwayRoom not found');
        }
        existUser.subwayRoom = subwayRoom;
      }
      await this.userRepository.update(id, existUser);
    } catch (e) {
      console.log(e);
    }
    return await this.userRepository.findOne({
      where: { id: id },
    });
  }

  async delete(id: number): Promise<void> {
    const user = await this.userRepository.findOne({
      where: { id: id },
    });
    if (User) {
      user.deletedAt = new Date();
      await this.userRepository.update(id, user);
    }
  }
}
