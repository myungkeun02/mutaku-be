import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { GameRoomsController } from './game-rooms/game-rooms.controller';
// import { GameRoomsModule } from './game-rooms/game-rooms.module';
import { AuthModule } from './auth/auth.module';
// import { GameController } from './game/game.controller';
// import { GameService } from './game/game.service';
// import { GameModule } from './game/game.module';
// import { GameRoomsService } from './game-rooms/game-rooms.service';
import { UsersModule } from './users/users.module';
import { UsersService } from './users/users.service';
import { AuthController } from './auth/auth.controller';
import { UsersController } from './users/users.controller';
import { jwtServiceStrategy } from './auth/strategies/jwt-service.strategy';
import { User } from './entities/user.entity';
import { CorrectAnswerLog } from './entities/correctAnswerLog.entity';
import { GameRoom } from './entities/gameRoom.entity';
import { GameRound } from './entities/gameRound.entity';
import { PlayerInRoom } from './entities/playerInRoom.entity';
import { Playlist } from './entities/playList.entity';
// import { PlayListsService } from './play-lists/play-lists.service';
// import { PlaylistsModule } from './play-lists/play-lists.module';

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
        Playlist,
      ],
      synchronize: true,
    }),
    // PlaylistsModule,
    // GameRoomsModule,
    // GameModule,
    AuthModule,
    UsersModule,
  ],
  controllers: [
    AppController,
    AuthController,
    // PlayListsService,
    // GameRoomsController,
    // GameController,
    UsersController,
  ],
  providers: [
    AppService,
    // GameService,
    // PlayListsService,
    // GameRoomsService,
    UsersService,
    jwtServiceStrategy,
  ],
})
export class AppModule {}
