import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUsersDto } from './dtos/create-users.dto';
import { Md5 } from 'ts-md5';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  store(@Body() createUserDto: CreateUsersDto) {
    return this.userService.store(createUserDto);
  }

  @Get('activate/:email/:key')
  activate(@Param('email') email: string, @Param('key') key: string) {
    return this.userService.activate(email, key);
  }

  @Get(':id')
  getSingleUser(@Param('id') id: number) {
    return this.userService.getUser(id);
  }
}
