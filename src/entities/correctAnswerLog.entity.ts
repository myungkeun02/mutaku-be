import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { GameRoom } from './gameRoom.entity';
import { GameRound } from './gameRound.entity';
import { PlayerInRoom } from './playerInRoom.entity';

@Entity()
export class CorrectAnswerLog {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => GameRoom, (gameRoom) => gameRoom.correctAnswerLogs)
  gameRoom: GameRoom;

  @ManyToOne(() => GameRound, (gameRound) => gameRound.correctAnswerLogs)
  gameRound: GameRound;

  @ManyToOne(() => PlayerInRoom, (player) => player.correctAnswerLogs)
  player: PlayerInRoom;

  @Column()
  timestamp: Date;

  @Column('text')
  description: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
