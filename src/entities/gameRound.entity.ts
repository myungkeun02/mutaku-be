import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { GameRoom } from './gameRoom.entity';
import { CorrectAnswerLog } from './correctAnswerLog.entity';

@Entity()
export class GameRound {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  youtube_link: string;

  @Column()
  correct_title: string;

  @ManyToOne(() => GameRoom, (gameRoom) => gameRoom.rounds)
  gameRoom: GameRoom;

  @OneToMany(() => CorrectAnswerLog, (log) => log.gameRound)
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
