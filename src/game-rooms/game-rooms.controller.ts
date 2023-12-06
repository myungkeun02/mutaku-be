import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { GameRoomsService } from './game-rooms.service';
import { CreateGameRoomDto } from './dto/create-game-room.dto';
import { JoinGameRoomDto } from './dto/join-game-room.dto';

@Controller('game-rooms')
export class GameRoomsController {
  constructor(private readonly gameRoomsService: GameRoomsService) {}

  @Post('create')
  async createGameRoom(@Body() createGameRoomDto: CreateGameRoomDto) {
    return this.gameRoomsService.createGameRoom(createGameRoomDto);
  }

  @Get()
  async getGameRooms() {
    return this.gameRoomsService.getGameRooms();
  }

  @Post(':roomId/join')
  async joinGameRoom(
    @Param('roomId') roomId: number,
    @Body() joinGameRoomDto: JoinGameRoomDto,
  ) {
    return this.gameRoomsService.joinGameRoom(roomId, joinGameRoomDto);
  }

  @Get(':roomId')
  async getGameRoomInfo(@Param('roomId') roomId: number) {
    return this.gameRoomsService.getGameRoomInfo(roomId);
  }
}
