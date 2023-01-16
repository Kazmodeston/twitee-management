import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthsService {
    
    constructor(private readonly usersService: UsersService) {}
    
    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.usersService.findByEmail(email);
        
        if (!user) {
            throw new HttpException('Login failed', HttpStatus.UNAUTHORIZED);
        }
        
        const isMatch = await bcrypt.compare(password, user.password);
        
        if (!isMatch) {
            throw new HttpException('Login failed', HttpStatus.UNAUTHORIZED);
        }
        
        
        if (!user.is_active) {
            throw new HttpException('Please check your mail to activate your account!', HttpStatus.UNAUTHORIZED);
        }
        
        return user;
    }
}
