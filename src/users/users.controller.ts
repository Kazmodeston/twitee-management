import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUsersDto } from './dtos/create-users.dto';

@Controller('users')
export class UsersController {
    
    constructor(private readonly userService: UsersService) {}
    
    @Post()
    store(@Body() createUserDto: CreateUsersDto) {
        return this.userService.store(createUserDto);
    }
    
    @Get('activate/:email/:key')
    activate(@Param() email: string, @Param() key: string) {
        console.log(email);
        console.log(key);
    }
}
