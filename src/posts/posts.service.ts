import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from '../entities/post.entity';
import { CreatePostDto } from './dtos/createPost.dto';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post) private postsRepository: Repository<Post>,
  ) {}

  createPost(validatedData: CreatePostDto, user): Promise<Post> {
    const formatedData = { ...validatedData, userId: user.id };
    const postSnapshot = this.postsRepository.create(formatedData);

    return this.postsRepository.save(postSnapshot);
  }

  async lists(user: any): Promise<Post[]> {
    const posts = await this.postsRepository.find({
      where: { userId: user.id },
      relations: {
        comments: true,
        user: true,
        likes: true,
      },
    });

    return posts;
  }

  async singlePost(id: number, user: any): Promise<any> {
    const post = await this.postsRepository.find({
      where: { id, userId: user.id },
      relations: {
        comments: true,
        user: true,
        likes: true,
      },
    });

    if (!post) {
      throw new HttpException('No Post Found!', HttpStatus.NOT_FOUND);
    }

    return post;
  }

  async deletePost(id: number, user: any): Promise<any> {
    const post = await this.singlePost(id, user);

    return this.postsRepository.remove(post);
  }
}
