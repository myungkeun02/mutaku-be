import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { AddMusicDto } from './dto/add-music.dto';
import { Playlist } from 'src/entities/playList.entity';
import { Music } from 'src/entities/music.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PlayListsService {
  constructor(
    @InjectRepository(Music)
    private readonly musicRepo: Repository<Music>,

    @InjectRepository(Playlist)
    private readonly playlistRepo: Repository<Playlist>,
  ) {}

  async createPlaylist(createPlaylistDto: CreatePlaylistDto) {
    const existingPlaylist = await this.playlistRepo.findOne({
      where: { title: createPlaylistDto.title },
    });

    if (existingPlaylist) {
      return '같은 이름의 플레이리스트가 존재합니다! 다른 이름을 이용해주세요';
    }

    const playlist = this.playlistRepo.create({
      ...createPlaylistDto,
    });

    const savedPlaylist = await this.playlistRepo.save(playlist);
    console.log(savedPlaylist);
    return savedPlaylist;
  }

  async addMusicToPlaylist(playlistId: number, addMusicDto: AddMusicDto) {
    const playlist = await this.playlistRepo.findOne({
      where: { id: playlistId },
    });

    if (!playlist) {
      throw new NotFoundException(`Playlist with id ${playlistId} not found`);
    }

    const music = this.musicRepo.create({
      title: addMusicDto.title,
      artist: addMusicDto.artist,
      youtube_link: addMusicDto.youtubeLink,
      playlist: playlist,
    });

    await this.musicRepo.save(music);
  }

  async getMusicByPlaylistId(playlistId: number) {
    const musicList = await this.musicRepo.find({
      where: { playlist: { id: playlistId } },
    });

    if (!musicList || musicList.length === 0) {
      throw new NotFoundException(
        `No music found for playlist with id ${playlistId}`,
      );
    }

    return musicList;
  }

  async getPublicPlaylists() {
    const playlists = await this.playlistRepo.find({
      where: { is_public: true },
    });
    console.log(playlists);
    return playlists;
  }
}
