import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
  JoinTable,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Music } from './music.entity';

@Entity()
export class Playlist {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ default: true })
  is_public: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => User, (user) => user.playlists)
  user: User;

  @ManyToMany(() => Music)
  @JoinTable({
    name: 'playlist_music',
    joinColumn: { name: 'playlist_id', referencedColumnName: 'playlist_id' },
    inverseJoinColumn: { name: 'music_id', referencedColumnName: 'music_id' },
  })
  musics: Music[];
}
