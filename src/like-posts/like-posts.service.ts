import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { LikePost } from '../entities/like-post.entity';
import { PostsService } from '../posts/posts.service';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class LikePostsService {
    constructor(
        @InjectRepository(LikePost) private likePostsRepository: Repository<LikePost>,
        private readonly postsService: PostsService
    ) {}
    
    
    async likePost(postId: number, validatedData: any, user: any): Promise<any> {
        // Check if post exist
        const post = await this.postsService.singlePost(postId, user);
        
        if (!post) {
            throw new HttpException('No Post Found!', HttpStatus.NOT_FOUND);
        }
        
        const checkLike = await this.findLike(postId, user);
        
        if (checkLike) {
            throw new HttpException('You have already liked this Post', HttpStatus.UNPROCESSABLE_ENTITY);
        }
        
        const formatedData = { ...validatedData, postId, userId: user.id };
        
        const likeSnapshot = this.likePostsRepository.create(formatedData);
        
        const saveLike = this.likePostsRepository.save(likeSnapshot);
        
        return saveLike;
        
    }
    
    async findLike(postId: number, user: any): Promise<LikePost> {
        return await this.likePostsRepository.findOne({ where: {
                postId, userId: user.id
            } 
        })
    }
}
