import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ModeratorsModule } from 'src/moderators/moderators.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MiscellaneousModule } from 'src/miscellaneous/miscellaneous.module';
import { BlacklistingService } from 'src/miscellaneous/blacklist.service';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        global: true,
        secret: configService.get<string>('JWT_SECRET'),
        // signOptions: { expiresIn: '7d' },
      }),
    }),
    ModeratorsModule,
    MiscellaneousModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, BlacklistingService],
  exports: [AuthService],
})
export class AuthModule {}
