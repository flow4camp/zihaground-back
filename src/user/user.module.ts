import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubwayRoomService } from '../subwayRoom/subwayRoom.service';
import { UserController } from './user.controller';
import { User } from './user.entity';
import { UserService } from './user.service';
import { SubwayRoom } from '../subwayRoom/subwayRoom.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([SubwayRoom]),
  ],
  controllers: [UserController],
  providers: [UserService, SubwayRoomService],
})
export class UserModule {}
