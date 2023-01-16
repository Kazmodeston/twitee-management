import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { AuthsService } from './auths.service';
import { LoginDto } from './dto/login.dto';
import { LocalAuthGuard } from './AuthIncludeFiles/local-auth.guard';

@Controller('auths')
export class AuthsController {
  constructor(private readonly authService: AuthsService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() request) {
    return request.user;
    // return this.authService.login(request.email, request.password);
  }
}
