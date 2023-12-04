import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { User } from './user.entity';
import { GameRoom } from './gameRoom.entity';
import { CorrectAnswerLog } from './correctAnswerLog.entity'; // 추가된 부분

@Entity()
export class PlayerInRoom {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  score: number;

  @Column({ default: false })
  is_winner: boolean;

  @ManyToOne(() => User, (user) => user.playersInRooms)
  user: User;

  @ManyToOne(() => GameRoom, (gameRoom) => gameRoom.players)
  gameRoom: GameRoom;

  @OneToMany(() => CorrectAnswerLog, (log) => log.player) // 추가된 부분
  correctAnswerLogs: CorrectAnswerLog[]; // 추가된 부분

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column({ nullable: true })
  deleted_at: Date;

  @Column({ default: false })
  is_deleted: boolean;
}
