import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SubwayRoomService } from '../subwayRoom/subwayRoom.service';
import {
  UserCreateInput,
  UserEditInput,
  UserLoginInput,
  UserUpdateInput,
} from './dto/user.input';
import { User } from './user.entity';
import {
  BadRequestCustomException,
  UnauthorizedCustomException,
} from '../exception/ziha.exception';

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

  async login(user: UserLoginInput): Promise<User> {
    const existUser = await this.userRepository.findOne({
      where: { email: user.email },
    });
    if (!existUser) {
      throw new UnauthorizedCustomException('User not found');
    }
    if (existUser.password !== user.password) {
      throw new UnauthorizedCustomException('Password is wrong');
    }
    return existUser;
  }

  async create(userInput: UserCreateInput): Promise<User> {
    const existUser = await this.userRepository.findOne({
      where: { username: userInput.username },
    });
    const existUser2 = await this.userRepository.findOne({
      where: { email: userInput.email },
    });
    if (existUser) {
      throw new BadRequestCustomException(
        'This username has already been added.',
      );
    }
    if (existUser2) {
      throw new BadRequestCustomException('This email has already been added.');
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

  async edit(id: number, user: UserEditInput): Promise<User> {
    try {
      const existUser = await this.userRepository.findOne({
        where: { id: id },
      });
      existUser.hatVariants = user.hatVariants;
      existUser.faceVariants = user.faceVariants;
      existUser.accVariants = user.accVariants;
      existUser.clothesVariants = user.clothesVariants;
      existUser.shoeVariants = user.shoeVariants;
      if (!existUser) {
        throw new Error('User not found');
      }
      await this.userRepository.update(id, existUser);
    } catch (e) {
      console.log(e);
    }
    return await this.userRepository.findOne({
      where: { id: id },
    });
  }

  async addPower(id: number, power: number): Promise<User> {
    try {
      const existUser = await this.userRepository.findOne({
        where: { id: id },
      });
      if (!existUser) {
        throw new Error('User not found');
      }
      existUser.power += power;
      if (existUser.power < 0) {
        existUser.power = 0;
      }
      await this.userRepository.update(id, existUser);
    } catch (e) {
      console.log(e);
    }
    return await this.userRepository.findOne({
      where: { id: id },
    });
  }

  async addRecord(id: number, score: number): Promise<User> {
    try {
      const existUser = await this.userRepository.findOne({
        where: { id: id },
      });
      if (!existUser) {
        throw new Error('User not found');
      }
      console.log('before', existUser.power);
      if (score === 1) {
        existUser.win += 1;
        existUser.power += 300;
        if (existUser.power < 0) {
          existUser.power = 0;
        }
      } else if (score === -1) {
        existUser.lose += 1;
        existUser.power -= 150;
        if (existUser.power < 0) {
          existUser.power = 0;
        }
      }
      console.log('after', existUser.power);
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
