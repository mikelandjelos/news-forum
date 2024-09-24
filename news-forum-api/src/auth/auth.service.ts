import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { Moderator } from 'src/moderators/entities/moderator.entity';
import { ModeratorsService } from 'src/moderators/moderators.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly moderatorsService: ModeratorsService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(username: string, pass: string): Promise<any> {
    const moderator: Moderator =
      await this.moderatorsService.findOneByUsername(username);

    if (!moderator)
      throw new UnauthorizedException(
        "User with given username doesn't exist!",
      );

    const passwordsMatch: boolean = await compare(pass, moderator?.password);

    if (!passwordsMatch) {
      throw new UnauthorizedException("Password isn't right!");
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...payload } = moderator;
    // const payload = { sub: moderator.id, username: moderator.username };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
