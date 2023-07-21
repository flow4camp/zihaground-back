import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export default class Subway {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ type: Number, description: 'subway number' })
  @Column({ nullable: false, type: 'integer' })
  subwayNum: number;

  @ApiProperty({ type: String, description: 'subway name' })
  @Column({ nullable: false, type: 'varchar' })
  subwayName: string;

  @ApiProperty({ type: String, description: 'station Id' })
  @Column({ nullable: false, type: 'varchar' })
  stationId: string;

  @ApiProperty({ type: String, description: 'station name' })
  @Column({ nullable: false, type: 'varchar' })
  stationName: string;
}
