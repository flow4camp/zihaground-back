import { ApiProperty } from '@nestjs/swagger';

export class CreateBuyDto {
  @ApiProperty({ type: Number, description: '아이템 아이디' })
  itemId: number;
  @ApiProperty({ type: Number, description: '유저 아이디' })
  userId: number;
  @ApiProperty({ type: Number, description: '가격' })
  price: number;
  @ApiProperty({ type: String, description: '아이템 타입', default: 'hat' })
  itemType: string;
}
