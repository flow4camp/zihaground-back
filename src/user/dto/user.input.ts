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

export class UserEditInput {
  @ApiProperty({ type: Number, description: '아이템 번호' })
  hatVariants: number;
  @ApiProperty({ type: Number, description: '아이템 번호' })
  accVariants: number;
  @ApiProperty({ type: Number, description: '아이템 번호' })
  faceVariants: number;
  @ApiProperty({ type: Number, description: '아이템 번호' })
  clothesVariants: number;
  @ApiProperty({ type: Number, description: '아이템 번호' })
  shoeVariants: number;
}

export class UserNameInput {
  @ApiProperty({ type: String, description: '유저 이름' })
  username: string;
}

export class UserGhostInput {
  @ApiProperty({ type: String, description: '유령 이름' })
  ghostname: string;
}
export class UserLoginInput {
  @ApiProperty({ type: String, description: '이메일' })
  email: string;
  @ApiProperty({ type: String, description: '패스워드' })
  password: string;
}

export class UserStation1Input {
  @ApiProperty({ type: String, description: '역이름 1' })
  station1: string;
}

export class UserStation2Input {
  @ApiProperty({ type: String, description: '역이름 2' })
  station2: string;
}

export class UserStation3Input {
  @ApiProperty({ type: String, description: '역이름 3' })
  station3: string;
}

export class UserLine1Input {
  @ApiProperty({ type: Number, description: '노선1' })
  subwayNum1: number;
}

export class UserLine2Input {
  @ApiProperty({ type: Number, description: '노선2' })
  subwayNum2: number;
}

// 시간
export class UserFirsttime3Input {
  @ApiProperty({ type: String, description: '시간1' })
  firsttime: string;
}
export class UserSecondtime3Input {
  @ApiProperty({ type: String, description: '시간2' })
  secondtime: string;
}

export class UserThirdtime3Input {
  @ApiProperty({ type: String, description: '시간3' })
  thirdtime: string;
}

export class UserRecordInput {
  @ApiProperty({ type: Number, description: '전적' })
  score: number;
  @ApiProperty({ type: Number, description: '파워' })
  power: number;
}
export class UserPowerInput {
  @ApiProperty({ type: Number, description: '파워' })
  power: number;
}
