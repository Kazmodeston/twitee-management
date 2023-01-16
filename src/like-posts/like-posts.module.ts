import { Module } from '@nestjs/common';
import { LikePostsController } from './like-posts.controller';
import { LikePostsService } from './like-posts.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LikePost } from '../entities/like-post.entity';
import { PostsModule } from '../posts/posts.module';

@Module({
  imports: [TypeOrmModule.forFeature([LikePost]), PostsModule],
  controllers: [LikePostsController],
  providers: [LikePostsService],
  exports: [LikePostsService]
})
export class LikePostsModule {}
