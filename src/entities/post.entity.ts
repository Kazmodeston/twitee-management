import { Entity, Column, JoinColumn, OneToOne, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from './User.entity';

@Entity({ name: 'posts' })
export class Post {
    
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    userId: number;
    
    @Column()
    title: string;
    
    @ManyToOne(() => User, user => user.posts, { onDelete: 'CASCADE' })
    @JoinColumn()
    user: User;
}