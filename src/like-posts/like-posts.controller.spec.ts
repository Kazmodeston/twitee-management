import { Test, TestingModule } from '@nestjs/testing';
import { LikePostsController } from './like-posts.controller';

describe('LikePostsController', () => {
  let controller: LikePostsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LikePostsController],
    }).compile();

    controller = module.get<LikePostsController>(LikePostsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
