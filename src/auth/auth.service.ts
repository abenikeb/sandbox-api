import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { ValidatePassword } from '../utility';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(email, pass, captchaCode, res) {
    if (!email || !captchaCode) {
      return res.status(422).json({
        message: 'Unproccesable request, please provide the required fields',
      });
    }
    const response = await fetch(
      `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${captchaCode}`,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
        },
        method: 'POST',
      },
    );
    const captchaValidation = await response.json();
    if (captchaValidation.success) {
      const existUser = (await this.usersService.findOneWithEmail(
        email,
      )) as any;
      if (!existUser)
        return res.status(400).send('Invalid user name or password');

      const validPassword = await ValidatePassword(
        pass,
        existUser.password,
        existUser.salt,
      );
      // if (!validPassword) throw new UnauthorizedException();

      if (!validPassword) throw new UnauthorizedException();

      const payload = {
        id: existUser?._id,
        email: existUser.email,
        firstName: existUser.firstName,
        lastName: existUser.lastName,
        tel: existUser.tel,
      };

      // const payload = {
      //   id: existUser?._id,
      //   email: existUser.email,
      //   firstName: existUser.firstName,
      // };

      return res.status(200).json({
        access_token: await this.jwtService.signAsync(payload),
      });
    }

    return res.status(422).json({
      message: 'Unproccesable request, Invalid captcha code',
    });
  }
}
