import {
  CreateDateColumn,
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Activate } from './activate.entity';
import { Post } from './post.entity';
import { Comment } from './comments.entity';
import { LikePost } from './like-post.entity';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ default: false })
  is_active: boolean;

  @CreateDateColumn()
  created_at: string;

  @UpdateDateColumn()
  updated_at: string;

  @OneToOne(() => Activate, (activate) => activate.user)
  activation: Activate;

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];

  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[];

  @OneToMany(() => LikePost, (like) => like.user)
  likes: LikePost[];

  /* @OneToOne(() => Activate)
    @JoinColumn()
    activation: Activate; */
}
