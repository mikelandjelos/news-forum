import { Module } from '@nestjs/common';
import { ModeratorsService } from './moderators.service';
import { ModeratorsController } from './moderators.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Moderator } from './entities/moderator.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Moderator])],
  controllers: [ModeratorsController],
  providers: [ModeratorsService],
  exports: [ModeratorsService],
})
export class ModeratorsModule {}
