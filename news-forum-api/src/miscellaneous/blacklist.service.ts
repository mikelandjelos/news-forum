import { Injectable } from '@nestjs/common';
import { createClient, RedisClientType } from 'redis';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class BlacklistingService {
  private client: RedisClientType;

  constructor(private readonly configService: ConfigService) {}

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
    await this.client.set(token, 'blacklisted', { EX: ttl });
  }

  async isTokenBlacklisted(token: string): Promise<boolean> {
    const value = await this.client.get(token);
    return value === 'blacklisted';
  }
}
