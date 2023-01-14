import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './entities/User.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Activate } from './entities/activate.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Activate])],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}
