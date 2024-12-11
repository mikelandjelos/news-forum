import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { BlacklistingService } from './blacklist.service';

@Module({
  imports: [ConfigModule.forRoot()],
  providers: [BlacklistingService],
  exports: [BlacklistingService],
})
export class MiscellaneousModule {}
