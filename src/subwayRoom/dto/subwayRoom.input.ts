import { SubwayRoom } from './../subwayRoom.entity';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../user/user.entity';

export class SubwayRoomCreateInput {
  @ApiProperty({ type: String, description: 'subway number' })
  subwayNum: string;
  users: User[];
}
