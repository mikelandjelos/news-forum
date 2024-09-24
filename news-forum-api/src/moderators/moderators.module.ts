import { Module } from '@nestjs/common';
import { ModeratorsService } from './moderators.service';
import { ModeratorsController } from './moderators.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Moderator } from './entities/moderator.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([Moderator]), JwtModule],
  controllers: [ModeratorsController],
  providers: [ModeratorsService],
  exports: [ModeratorsService],
})
export class ModeratorsModule {}
