import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToOne,
  OneToMany,
} from 'typeorm';
import { User } from './user.entity';
import { Playlist } from './playList.entity';
import { PlayerInRoom } from './playerInRoom.entity';
import { GameRound } from './gameRound.entity';
import { CorrectAnswerLog } from './correctAnswerLog.entity';

export enum MaxPlayer {
  FOUR = 4,
  FIVE = 5,
  SIX = 6,
  SEVEN = 7,
  EIGHT = 8,
}

@Entity()
export class GameRoom {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({
    type: 'enum',
    enum: MaxPlayer,
  })
  maxPlayers: MaxPlayer;

  @Column({ nullable: true })
  password: string;

  @Column({ default: true })
  is_public: boolean;

  @ManyToOne(() => User, (user) => user.gameRoomsHosted)
  host_user: User;

  @OneToMany(() => PlayerInRoom, (player) => player.gameRoom)
  players: PlayerInRoom[];

  @OneToOne(() => Playlist)
  playlist: Playlist;

  @OneToMany(() => GameRound, (round) => round.gameRoom)
  rounds: GameRound[];

  @OneToMany(() => CorrectAnswerLog, (log) => log.gameRoom)
  correctAnswerLogs: CorrectAnswerLog[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column({ nullable: true })
  deleted_at: Date;

  @Column({ default: false })
  is_deleted: boolean;
}
