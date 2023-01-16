import { Module } from '@nestjs/common';
import { AuthsController } from './auths.controller';
import { AuthsService } from './auths.service';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './AuthIncludeFiles/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../utils/constants';
import { JwtService } from '@nestjs/jwt/dist';

@Module({
  imports: [UsersModule, PassportModule, JwtModule.register({
      secret: 'secretKey',
      // secretOrPrivateKey: 'secretKey',
      signOptions: { expiresIn: '60s' },
  })],
  controllers: [AuthsController],
  providers: [AuthsService, LocalStrategy, JwtService]
})
export class AuthsModule {}
