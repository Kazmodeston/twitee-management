import { Body, Controller, Delete, Get, Param, Post, Request } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dtos/createPost.dto';

@Controller('posts')
export class PostsController {
    
    private readonly user  = {
        id: 1,
        name: 'muhammad',
    }
    
    constructor(private readonly postsService: PostsService) {}
    
    @Post()
    save(@Body() request: CreatePostDto): any {
        return this.postsService.createPost(request, this.user);
    }
    
    @Get()
    list(@Request() request): any {
        return this.postsService.lists(this.user);
    }
    
    @Get(':id')
    show(@Param('id') id: number) {
        return this.postsService.singlePost(id, this.user)
    }
    
    @Delete(':id')
    delete(@Param('id') id: number) {
        return this.postsService.deletePost(id, this.user);
    }
    
    
}
