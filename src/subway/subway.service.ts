import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import Subway from './subway.entity';

@Injectable()
export class SubwayService {
  constructor(
    @InjectRepository(Subway)
    private subwayRepository: Repository<Subway>,
  ) {}

  async findAll(): Promise<Subway[]> {
    return await this.subwayRepository.find();
  }

  async findById(id: number): Promise<Subway> {
    return await this.subwayRepository.findOne({
      where: { id: id },
    });
  }

  async findByStationName(name: string): Promise<Subway[]> {
    return await this.subwayRepository.find({
      where: { stationName: Like(`%${name}%`) },
    });
  }

  async create(subway: Subway): Promise<Subway> {
    return await this.subwayRepository.save({
      ...subway,
    });
  }

  async update(id: number, subway: Subway): Promise<Subway> {
    try {
      await this.subwayRepository.update(id, subway);
    } catch (e) {
      console.log(e);
    }
    return await this.subwayRepository.findOne({
      where: { id: id },
    });
  }

  async delete(id: number): Promise<void> {
    const subway = await this.subwayRepository.findOne({
      where: { id: id },
    });
    if (subway) {
      await this.subwayRepository.update(id, subway);
    }
  }
}
