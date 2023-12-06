import { MaxPlayer } from 'src/entities/gameRoom.entity';

export class CreateGameRoomDto {
  title: string;
  maxPlayers: MaxPlayer;
  is_public: boolean;
  password: string;
}
