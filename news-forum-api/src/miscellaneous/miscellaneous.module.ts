import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { BlacklistingService } from './blacklist.service';
import { EncryptionService } from './encryption.service';

@Module({
  imports: [ConfigModule.forRoot()],
  providers: [BlacklistingService, EncryptionService],
  exports: [BlacklistingService, EncryptionService],
})
export class MiscellaneousModule {}
