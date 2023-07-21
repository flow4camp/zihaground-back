import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/user.entity';
import { SubwayRoomController } from './subwayRoom.controller';
import { SubwayRoom } from './subwayRoom.entity';
import { SubwayRoomService } from './subwayRoom.service';
import { SubwayRoomGateway } from './subwayRoom.gateway';

@Module({
  imports: [
    TypeOrmModule.forFeature([SubwayRoom]),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [SubwayRoomController],
  providers: [SubwayRoomService, SubwayRoomGateway],
})
export class SubwayRoomModule {}
