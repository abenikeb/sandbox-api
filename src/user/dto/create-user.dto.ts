import { IsNotEmpty, Length, IsEmail } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @Length(7, 12)
  username: string;

  @IsNotEmpty()
  @Length(5, 250)
  password: string;

  @IsEmail()
  email: string;
}
