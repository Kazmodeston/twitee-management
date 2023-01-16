import { IsEnum, IsNotEmpty } from 'class-validator';
import { Status } from 'src/utils/constants';

export class CreateLike {
  @IsEnum(Status)
  @IsNotEmpty()
  status: string;
}
