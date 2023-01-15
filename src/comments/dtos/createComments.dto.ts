import { IsString } from "class-validator";

export class CreateComment {
    
    @IsString()
    text: string;
}