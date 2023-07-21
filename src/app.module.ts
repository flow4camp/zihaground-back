import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ImageController } from './upload/image.controller';
import { UserModule } from './user/user.module';
import { SubwayRoomModule } from './subwayRoom/subwayRoom.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'test',
      password: '1234',
      database: 'zihatest',
      synchronize: true,
      logging: false,
      entities: ['src/**/**.entity{.ts,.js}'],
      migrations: ['src/migrations/**/*{.ts,.js}'],
      subscribers: ['src/subscriber/**/*{.ts,.js}'],
    }),
    UserModule,
    SubwayRoomModule,
  ],
  controllers: [AppController, ImageController],
  providers: [AppService],
})
export class AppModule {}
