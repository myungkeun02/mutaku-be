import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Playlist } from './playList.entity';
import { GameRoom } from './gameRoom.entity';
import { PlayerInRoom } from './playerInRoom.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ default: 0 })
  songs_correctly_guessed: number;

  @OneToMany(() => Playlist, (playlist) => playlist.user)
  playlists: Playlist[];

  @OneToMany(() => GameRoom, (gameRoom) => gameRoom.host_user)
  gameRoomsHosted: GameRoom[];

  @OneToMany(() => PlayerInRoom, (player) => player.user)
  playersInRooms: PlayerInRoom[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column({ nullable: true })
  deleted_at: Date;

  @Column({ default: false })
  is_deleted: boolean;

  @Column()
  refresh_token: string;
}
