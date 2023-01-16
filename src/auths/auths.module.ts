import { Module } from '@nestjs/common';
import { AuthsController } from './auths.controller';
import { AuthsService } from './auths.service';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './AuthIncludeFiles/local.strategy';

@Module({
  imports: [UsersModule, PassportModule],
  controllers: [AuthsController],
  providers: [AuthsService, LocalStrategy],
})
export class AuthsModule {}
