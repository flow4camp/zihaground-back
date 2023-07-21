import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SubwayRoom } from './subwayRoom.entity';

@Injectable()
export class SubwayRoomService {
  constructor(
    @InjectRepository(SubwayRoom)
    private subwayRoomRepository: Repository<SubwayRoom>,
  ) {}

  async findAll(): Promise<SubwayRoom[]> {
    return await this.subwayRoomRepository.find({
      where: { deletedAt: null },
    });
  }

  async findById(id: number): Promise<SubwayRoom> {
    return await this.subwayRoomRepository.findOne({
      where: { id: id, deletedAt: null },
    });
  }

  async findByIdWithUsers(id: number): Promise<SubwayRoom> {
    const answer = await this.subwayRoomRepository
      .createQueryBuilder('subway_room')
      .leftJoinAndSelect('subway_room.users', 'users')
      .where('subway_room.id = :id', { id })
      .andWhere('subway_room.deletedAt IS NULL')
      .getOne();
    return answer;
  }

  async create(subwayRoom: SubwayRoom): Promise<SubwayRoom> {
    return await this.subwayRoomRepository.save({
      createdAt: new Date(),
      ...subwayRoom,
    });
  }

  async update(id: number, subwayRoom: SubwayRoom): Promise<SubwayRoom> {
    try {
      await this.subwayRoomRepository.update(id, subwayRoom);
    } catch (e) {
      console.log(e);
    }
    return await this.subwayRoomRepository.findOne({
      where: { id: id },
    });
  }

  async delete(id: number): Promise<void> {
    const subwayRoom = await this.subwayRoomRepository.findOne({
      where: { id: id },
    });
    if (subwayRoom) {
      subwayRoom.deletedAt = new Date();
      await this.subwayRoomRepository.update(id, subwayRoom);
    }
  }
}
