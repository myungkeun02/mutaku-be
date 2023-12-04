import { Module } from '@nestjs/common';
import { PlayListsService } from './play-lists.service';
import { PlayListsController } from './play-lists.controller';

@Module({
  controllers: [PlayListsController],
  providers: [PlayListsService],
})
export class PlaylistsModule {}
