import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubwayController } from './subway.controller';
import { SubwayService } from './subway.service';
import Subway from './subway.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Subway])],
  controllers: [SubwayController],
  providers: [SubwayService],
})
export class SubwayModule {}
