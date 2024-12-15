import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { createClient, RedisClientType } from 'redis';
import { ConfigService } from '@nestjs/config';
import { EncryptionService } from './encryption.service';

@Injectable()
export class BlacklistingService implements OnModuleInit, OnModuleDestroy {
  private client: RedisClientType;

  constructor(
    private readonly configService: ConfigService,
    private readonly encryptionService: EncryptionService, // Inject EncryptionService
  ) {}

  async onModuleInit(): Promise<void> {
    this.client = await createClient({
      url: this.configService.get<string>('REDIS_URL'),
    });
    try {
      await this.client.connect();
      console.log(`Connected to Redis - ping - ${await this.client.ping()}`);
    } catch (error) {
      console.error('Failed to connect to Redis', error);
    }
  }

  async onModuleDestroy(): Promise<void> {
    await this.client.quit();
    console.log('Redis connection closed');
  }

  async blacklistToken(token: string, ttl: number): Promise<void> {
    const encryptedToken = await this.encryptionService.encryptToken(token); // Encrypt token
    await this.client.set(`blacklisted:${encryptedToken}`, 'blacklisted', {
      EX: ttl,
    });
  }

  async isTokenBlacklisted(token: string): Promise<boolean> {
    const encryptedToken = await this.encryptionService.encryptToken(token); // Encrypt token for lookup
    const value = await this.client.get(`blacklisted:${encryptedToken}`);
    return value === 'blacklisted';
  }
}
