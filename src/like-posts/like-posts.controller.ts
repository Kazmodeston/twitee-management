import { Body, Controller, Post, Param, ParseIntPipe } from '@nestjs/common';
import { LikePostsService } from './like-posts.service';
import { CreateLike } from './dtos/create-like.dto';

@Controller('posts')
export class LikePostsController {
    
    private readonly user = {
        id: 1,
        name: 'muhammad',
    }
    
    constructor(private readonly likesPostService: LikePostsService) {}
    
    @Post(':id/like-posts')
    save(@Param('id', ParseIntPipe) id: number, @Body() request: CreateLike) {
        return this.likesPostService.likePost(id, request, this.user);
    }
}
