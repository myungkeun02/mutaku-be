import { Body, Controller, Param, Post } from '@nestjs/common';
import { PlayerInRoomService } from './player-in-room.service';
import { JoinGameRoomDto } from 'src/game-rooms/dto/join-game-room.dto';

@Controller('player-in-room')
export class PlayerInRoomController {
  constructor(private readonly playerInRommService: PlayerInRoomService) {}

  @Post(':roomId/join')
  async joinGameRoom(
    @Param('roomId') roomId: number,
    @Body() joinGameRoomDto: JoinGameRoomDto,
  ) {
    return this.playerInRommService.joinGameRoom(roomId, joinGameRoomDto);
  }
}
