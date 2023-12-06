import { Injectable } from '@nestjs/common';
import { CreateGameRoomDto } from './dto/create-game-room.dto';
import { JoinGameRoomDto } from './dto/join-game-room.dto';
import { Repository } from 'typeorm';
import { GameRoom } from 'src/entities/gameRoom.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class GameRoomsService {
  constructor(
    @InjectRepository(GameRoom)
    private readonly gameRoomRepo: Repository<GameRoom>,
  ) {}

  async createGameRoom(createGameRoomDto: CreateGameRoomDto) {
    const { title, maxPlayers, is_public, password } = createGameRoomDto;

    const gameRoom = this.gameRoomRepo.create({
      title,
      maxPlayers,
      is_public,
      password,
    });

    return await this.gameRoomRepo.save(gameRoom);
  }

  async getGameRooms() {
    // TODO: Implement get game rooms logic
  }

  async joinGameRoom(roomId: number, joinGameRoomDto: JoinGameRoomDto) {
    console.log(roomId, joinGameRoomDto);
    // TODO: Implement join game room logic
  }

  async getGameRoomInfo(roomId: number) {
    console.log(roomId);
    // TODO: Implement get game room info logic
  }
}
