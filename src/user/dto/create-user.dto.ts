import { IsNotEmpty, Length, IsEmail } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @Length(2, 15)
  firstName: string;

  @Length(1, 15)
  lastName: string;

  @IsNotEmpty()
  tel: string;

  @IsNotEmpty()
  @Length(5, 250)
  password: string;

  @IsEmail()
  email: string;
  @IsNotEmpty()
  captchaCode: string;
}
