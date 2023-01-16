import {
  Controller,
  Body,
  Post,
  Param,
  Get,
  ParseIntPipe,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateComment } from './dtos/createComments.dto';

@Controller('posts')
export class CommentsController {
  private readonly user = {
    id: 1,
    name: 'muhammad',
  };

  constructor(private readonly commentsService: CommentsService) {}

  @Post(':id/comments')
  save(
    @Param('id', ParseIntPipe) id: number,
    @Body() request: CreateComment,
  ): any {
    return this.commentsService.postComment(id, request, this.user);
  }

  @Get(':id/comments')
  list(@Param('id', ParseIntPipe) id: number): any {
    return this.commentsService.list(id, this.user);
  }
}
