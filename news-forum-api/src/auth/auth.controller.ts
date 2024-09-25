import { AuthService, Seconds } from './auth.service';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
  Request,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { SignInDto } from './dto/sign-in.dto';
import { AuthGuard } from './auth.guard';
import { Moderator } from 'src/moderators/entities/moderator.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('signIn')
  async signIn(
    @Body() signInDto: SignInDto,
    @Query('expiresIn', ParseIntPipe) expiresIn: Seconds = 7 * 24 * 60 * 60, // 7 days in seconds.
  ): Promise<{ accessToken: string; expiresIn: Seconds }> {
    return this.authService.signIn(
      signInDto.username,
      signInDto.password,
      expiresIn,
    );
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req): Moderator & { iat: number; exp: number } {
    return req.user;
  }
}
