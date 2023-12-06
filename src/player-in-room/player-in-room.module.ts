import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlayerInRoom } from 'src/entities/playerInRoom.entity';
import { PlayerInRoomController } from './player-in-room.controller';
import { PlayerInRoomService } from './player-in-room.service';

@Module({
  imports: [TypeOrmModule.forFeature([PlayerInRoom])],
  controllers: [PlayerInRoomController],
  providers: [],
  exports: [PlayerInRoomService],
})
export class PlayerInRoomModule {}
