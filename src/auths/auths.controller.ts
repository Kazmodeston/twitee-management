import { Controller, Post, Body } from '@nestjs/common';
import { AuthsService } from './auths.service';
import { LoginDto } from './dto/login.dto';

@Controller('auths')
export class AuthsController {
    constructor(private readonly authService: AuthsService) {}
    
    @Post()
    login(@Body() request: LoginDto) {
        return this.authService.login(request);
    }
}
