import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { Moderator } from 'src/moderators/entities/moderator.entity';
import { ModeratorsService } from 'src/moderators/moderators.service';

export type Seconds = number;

@Injectable()
export class AuthService {
  constructor(
    private readonly moderatorsService: ModeratorsService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(
    username: string,
    pass: string,
    expiresIn: Seconds = 7 * 24 * 60 * 60, // 7 days in seconds.
  ): Promise<{ accessToken: string; expiresIn: number }> {
    const moderator: Moderator =
      await this.moderatorsService.findOneByUsername(username);

    if (!moderator)
      throw new BadRequestException("User with given username doesn't exist!");

    const passwordsMatch: boolean = await compare(pass, moderator?.password);

    if (!passwordsMatch) {
      throw new BadRequestException("Password isn't right!");
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...payload } = moderator;

    console.log(expiresIn);

    return {
      accessToken: await this.jwtService.signAsync(payload, {
        expiresIn: expiresIn,
      }),
      expiresIn,
    };
  }
}
