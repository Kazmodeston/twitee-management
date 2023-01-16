import { Entity, Column, JoinColumn, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { User } from './User.entity';
import { Comment } from './comments.entity';
import { LikePost } from './like-post.entity';

@Entity({ name: 'posts' })
export class Post {
    
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    userId: number;
    
    @Column()
    title: string;
    
    @CreateDateColumn()
    created_at: string;
    
    @UpdateDateColumn()
    updated_at: string;
    
    @ManyToOne(() => User, user => user.posts, { onDelete: 'CASCADE' })
    @JoinColumn()
    user: User;
    
    @OneToMany(() => Comment, comment => comment.post)
    comments: Comment[];
    
    @OneToMany(() => LikePost, like => like.post)
    likes: LikePost[];
}