// src/game-rooms/services/player-in-room.service.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PlayerInRoom } from 'src/entities/playerInRoom.entity';
import { JoinGameRoomDto } from './dto/join-game-room.dto';

@Injectable()
export class PlayerInRoomService {
  constructor(
    @InjectRepository(PlayerInRoom)
    private readonly playerInRoomRepository: Repository<PlayerInRoom>,
  ) {}

  async joinGameRoom(userId: number, joinGameRoomDto: JoinGameRoomDto) {
    const playerInRoom = new PlayerInRoom();
    playerInRoom.user.id = userId;
    playerInRoom.gameRoom.id = joinGameRoomDto.user_id;

    const result = await this.playerInRoomRepository.save(playerInRoom);

    return result;
  }
}
