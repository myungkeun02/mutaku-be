import { Injectable } from '@nestjs/common';
import { CreateGameRoomDto } from './dto/create-game-room.dto';
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
    const gameRooms = await this.gameRoomRepo.find({
      where: {
        is_public: true,
      },
    });
    console.log(gameRooms);
    return gameRooms;
  }

  async getGameRoomInfo(roomId: number) {
    const gameRoomInfo = await this.gameRoomRepo.findOne({
      where: { id: roomId },
    });
    console.log(gameRoomInfo);
    return gameRoomInfo;
  }
}
