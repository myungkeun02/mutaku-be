import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Music } from 'src/entities/music.entity';
import { Playlist } from 'src/entities/playList.entity';
import { PlayListsService } from './play-lists.service';

@Module({
  imports: [TypeOrmModule.forFeature([Music, Playlist])],
  controllers: [],
  providers: [PlayListsService],
  exports: [PlayListsService],
})
export class PlaylistsModule {}
