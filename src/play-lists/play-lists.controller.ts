// playlist.controller.ts
import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { PlayListsService } from './play-lists.service';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { AddMusicDto } from './dto/add-music.dto';

@Controller('playlists')
export class PlayListsController {
  constructor(private readonly playlistService: PlayListsService) {}

  @Post()
  createPlaylist(@Body() createPlaylistDto: CreatePlaylistDto) {
    return this.playlistService.createPlaylist(createPlaylistDto);
  }

  @Post(':id/add-music')
  addMusicToPlaylist(
    @Param('id') playlistId: number,
    @Body() addMusicDto: AddMusicDto,
  ) {
    return this.playlistService.addMusicToPlaylist(playlistId, addMusicDto);
  }

  @Get(':/id')
  getMusicByPlaylistId(@Param('id') playlistId: number) {
    return this.playlistService.getMusicByPlaylistId(playlistId);
  }

  @Get('public')
  getPublicPlaylists() {
    return this.playlistService.getPublicPlaylists();
  }
}
