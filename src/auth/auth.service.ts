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

  async signIn(username, pass, res) {
    const existUser = await this.usersService.findOneWithUser(username);

    if (!existUser)
      return res.status(400).json({ message: 'Invalid user name or password' });

    let validPassword = await ValidatePassword(
      pass,
      existUser.password,
      existUser.salt,
    );
    if (!validPassword) throw new UnauthorizedException();

    let payload = { username: existUser.username, sub: existUser.email };
    return res.status(200).json({
      access_token: await this.jwtService.signAsync(payload),
    });
  }
}
