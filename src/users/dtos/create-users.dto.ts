import { IsEmail, IsNotEmpty, IsString, IsStrongPassword  } from "class-validator";

export class CreateUsersDto {
    
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string;
    
    @IsNotEmpty()
    @IsString()
    @IsStrongPassword()
    password: string;
}