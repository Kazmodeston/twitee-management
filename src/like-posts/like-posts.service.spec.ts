import { Test, TestingModule } from '@nestjs/testing';
import { LikePostsService } from './like-posts.service';

describe('LikePostsService', () => {
  let service: LikePostsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LikePostsService],
    }).compile();

    service = module.get<LikePostsService>(LikePostsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
