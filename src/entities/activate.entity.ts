import {
  Entity,
  Column,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './User.entity';

@Entity({ name: 'activations' })
export class Activate {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column({ unique: true })
  key: string;

  @OneToOne(() => User, (user) => user.activation, { onDelete: 'CASCADE' })
  @JoinColumn()
  user: User;
}
