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

  async signIn(email, pass, res) {
    const existUser = (await this.usersService.findOneWithEmail(email)) as any;

    if (!existUser)
      return res.status(400).send('Invalid user name or password');

    let validPassword = await ValidatePassword(
      pass,
      existUser.password,
      existUser.salt,
    );
    if (!validPassword) throw new UnauthorizedException();

    let payload = {
      id: existUser?._id,
      email: existUser.email,
      firstName: existUser.firstName,
      lastName: existUser.lastName,
      tel: existUser.tel,
    };

    return res.status(200).json({
      access_token: await this.jwtService.signAsync(payload),
    });
  }
}
