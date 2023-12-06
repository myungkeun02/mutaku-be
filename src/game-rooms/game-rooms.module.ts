import { Module } from '@nestjs/common';
import { GameRoomsController } from './game-rooms.controller';
import { GameRoomsService } from './game-rooms.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GameRoom } from 'src/entities/gameRoom.entity';

@Module({
  imports: [TypeOrmModule.forFeature([GameRoom])],
  controllers: [GameRoomsController],
  providers: [GameRoomsService],
  exports: [GameRoomsService],
})
export class GameRoomsModule {}
