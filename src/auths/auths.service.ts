import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { User } from '../users/entities/user.entity';

@Injectable()
export class AuthsService {
    
    constructor(private readonly usersService: UsersService) {}
    
    async login(validatedData: LoginDto): Promise<User> {
        const user = await this.usersService.findByEmail(validatedData.email);
        
        if (!user) {
            throw new HttpException('Login failed', HttpStatus.UNAUTHORIZED);
        }
        
        const isMatch = await bcrypt.compare(validatedData.password, user.password);
        
        if (!isMatch) {
            throw new HttpException('Login failed', HttpStatus.UNAUTHORIZED);
        }
        
        
        if (!user.is_active) {
            throw new HttpException('Please check your mail to activate your account!', HttpStatus.UNAUTHORIZED);
        }
        
        return user;
    }
}
