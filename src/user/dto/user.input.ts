import { ApiProperty } from '@nestjs/swagger';
export class UserCreateInput {
  @ApiProperty({ type: String, description: '유저 이름' })
  username: string;
  @ApiProperty({ type: String, description: '패스워드' })
  password: string;
  @ApiProperty({ type: String, description: '이메일' })
  email: string;
  @ApiProperty({ type: Number, description: '유저 타입' })
  type: number;
}

export class UserUpdateInput {
  @ApiProperty({ type: String, description: '유저 이름' })
  username: string;
  @ApiProperty({ type: String, description: '패스워드' })
  password: string;
  @ApiProperty({ type: String, description: '이메일' })
  email: string;
  @ApiProperty({ type: Number, description: '유저 타입' })
  type: number;
  @ApiProperty({ type: Number, description: '루틴 지하철 호선' })
  subwayNum: number;
  @ApiProperty({ type: Number, description: '지하철 호선 id' })
  subwayRoomId: number;
}

export class UserLoginInput {
  @ApiProperty({ type: String, description: '이메일' })
  email: string;
  @ApiProperty({ type: String, description: '패스워드' })
  password: string;
}

export class UserRecordInput {
  @ApiProperty({ type: Number, description: '전적' })
  score: number;
  @ApiProperty({ type: Number, description: '파워' })
  power: number;
}
