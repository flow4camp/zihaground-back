import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import axios from 'axios';
import { SubwayService } from './subway.service';
import Subway from './subway.entity';
import * as fs from 'fs';
import * as readline from 'readline';

async function fetchData() {
  const url = `http://swopenapi.seoul.go.kr/api/subway/4d4a47744f64757337346b45715665/json/realtimeStationArrival/0/5/${'답십리'}`;

  try {
    const response = await axios.get(url);
    // 성공적인 응답 처리
    // response.data에 응답 데이터가 포함됨
    console.log('Status', response.status);
    console.log('Reponse received', response.data);
  } catch (error) {
    // 오류 처리
    console.error('Error', error);
  }
}

@Controller('subway')
@ApiTags('Subway')
export class SubwayController {
  constructor(private readonly subwayService: SubwayService) {}

  @Get('api')
  async findApi(): Promise<void> {
    await fetchData();
    return;
  }

  @Get('update-station')
  async updateStation(): Promise<void> {
    const readStream = fs.createReadStream('db.txt');
    const rl = readline.createInterface({
      input: readStream,
      crlfDelay: Infinity,
    });

    // 한 줄씩 읽어서 데이터베이스에 삽입
    for await (const line of rl) {
      const [subwayNum, stationId, stationName, subwayName] = line.split('\t');

      // 데이터베이스에 삽입
      await this.subwayService.create({
        id: null,
        subwayNum: parseInt(subwayNum),
        subwayName: subwayName,
        stationName: stationName,
        stationId: stationId,
      });
    }
    return;
  }

  @Get()
  async findAll(): Promise<Subway[]> {
    return this.subwayService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Subway> {
    return this.subwayService.findById(id);
  }

  @Get('name/:name')
  async findByName(@Param('name') name: string): Promise<Subway[]> {
    return this.subwayService.findByStationName(name);
  }

  @Post()
  @ApiBody({ type: Subway })
  async create(@Body() Subway: Subway): Promise<Subway> {
    return this.subwayService.create(Subway);
  }

  @Put(':id')
  @ApiBody({ type: Subway })
  async update(
    @Param('id') id: number,
    @Body() Subway: Subway,
  ): Promise<Subway> {
    return this.subwayService.update(id, Subway);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    return this.subwayService.delete(id);
  }
}
