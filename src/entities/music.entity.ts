import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Playlist } from './playList.entity';

@Entity()
export class Music {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  artist: string;

  @Column()
  youtube_link: string;

  @ManyToOne(() => Playlist, (playlist) => playlist.musics)
  @JoinColumn({ name: 'playlist_id' })
  playlist: Playlist;
}
