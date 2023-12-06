import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GameRoomsController } from './game-rooms/game-rooms.controller';
import { GameRoomsModule } from './game-rooms/game-rooms.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
// import { GameController } from './game/game.controller';
// import { GameService } from './game/game.service';
// import { GameModule } from './game/game.module';
import { UsersModule } from './users/users.module';
import { AuthController } from './auth/auth.controller';
import { UsersController } from './users/users.controller';
import { jwtServiceStrategy } from './auth/strategies/jwt-service.strategy';
import { User } from './entities/user.entity';
import { CorrectAnswerLog } from './entities/correctAnswerLog.entity';
import { GameRoom } from './entities/gameRoom.entity';
import { GameRound } from './entities/gameRound.entity';
import { PlayerInRoom } from './entities/playerInRoom.entity';
import { Playlist } from './entities/playList.entity';
import { Music } from './entities/music.entity';
import { PlaylistsModule } from './play-lists/play-lists.module';
import { PlayListsController } from './play-lists/play-lists.controller';
import { PlayerInRoomController } from './player-in-room/player-in-room.controller';
import { PlayerInRoomService } from './player-in-room/player-in-room.service';
import { PlayerInRoomModule } from './player-in-room/player-in-room.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: 3306,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [
        User,
        CorrectAnswerLog,
        GameRoom,
        GameRound,
        PlayerInRoom,
        Music,
        Playlist,
      ],
      synchronize: true,
    }),
    PlaylistsModule,
    GameRoomsModule,
    // GameModule,
    AuthModule,
    UsersModule,
    PlayerInRoomModule,
  ],
  controllers: [
    AppController,
    AuthController,
    GameRoomsController,
    PlayListsController,
    // GameController,
    UsersController,
    PlayerInRoomController,
  ],
  providers: [AppService, jwtServiceStrategy, PlayerInRoomService],
})
export class AppModule {}
