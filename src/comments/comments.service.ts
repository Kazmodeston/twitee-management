import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from '../entities/comments.entity';
import { PostsService } from '../posts/posts.service';

@Injectable()
export class CommentsService {
    
    constructor(
        @InjectRepository(Comment) private commentsRepository: Repository<Comment>,
        private readonly postsService: PostsService
    ) {}
    
    async postComment(postId: number, validatedData: any, user: any): Promise<Comment[]> {
        const post = await this.postsService.singlePost(postId, user);
        
        const formatedData = {...validatedData, postId, userId: user.id};
        
        const commentSnapShot = this.commentsRepository.create(formatedData);
        
        return this.commentsRepository.save(commentSnapShot);
        
    }
    
    async list(postId: number, user: any): Promise<Comment[]> {
        const post = await this.postsService.singlePost(postId, user);
        
        const comments = await this.commentsRepository.find({ where: {postId, userId: user.id}, relations: {
                post: true,
                user: true
            } 
        })
        
        if (!comments) {
            throw new HttpException('No Comment Found', HttpStatus.NOT_FOUND);
        }
        
        return comments;
    }
}
