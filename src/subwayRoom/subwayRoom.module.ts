import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/user.entity';
import { SubwayRoomController } from './subwayRoom.controller';
import { SubwayRoom } from './subwayRoom.entity';
import { SubwayRoomService } from './subwayRoom.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([SubwayRoom]),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [SubwayRoomController],
  providers: [SubwayRoomService],
})
export class SubwayRoomModule {}
