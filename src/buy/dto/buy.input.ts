import { ApiProperty } from '@nestjs/swagger';

export class CreateBuyDto {
  @ApiProperty({ type: Number, description: '아이템 아이디' })
  itemId: number;
  @ApiProperty({ type: Number, description: '유저 아이디' })
  userId: number;
  @ApiProperty({ type: Number, description: '수량' })
  quantity: number;
}
