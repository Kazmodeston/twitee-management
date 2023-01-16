import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { AuthsModule } from './auths/auths.module';
import { PostsModule } from './posts/posts.module';
import { CommentsModule } from './comments/comments.module';
import { LikePostsModule } from './like-posts/like-posts.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'twitee_db',
      entities: ['dist/**/*.entity.js'],
      synchronize: true,
    }),
    
    MailerModule.forRoot({
      transport: {
        host: 'smtp.mailtrap.io',
        port: 2525,
        // secure: false, // true for 465, false for other ports
        auth: {
          user: '7eccc3319238ff',
          pass: '4350006e63fdf7'
        },
      }
    }),
    UsersModule,
    AuthsModule,
    PostsModule,
    CommentsModule,
    LikePostsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
