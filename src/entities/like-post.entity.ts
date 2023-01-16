import {
  Entity,
  Column,
  JoinColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './User.entity';
import { Post } from './post.entity';
import { Status } from 'src/utils/constants';

@Entity({ name: 'like_posts' })
export class LikePost {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  postId: number;

  @Column()
  userId: number;

  @Column({
    type: 'enum',
    enum: Status,
    default: Status.NONE,
  })
  status: string;

  @CreateDateColumn()
  created_at: string;

  @UpdateDateColumn()
  updated_at: string;

  @ManyToOne(() => Post, (post) => post.likes, { onDelete: 'CASCADE' })
  @JoinColumn()
  post: Post;

  @ManyToOne(() => User, (user) => user.likes, { onDelete: 'CASCADE' })
  @JoinColumn()
  user: User;
}
