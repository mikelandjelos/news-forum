import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { createCipheriv, createDecipheriv, randomBytes, scrypt } from 'crypto';
import { promisify } from 'util';

@Injectable()
export class EncryptionService {
  private readonly password;
  private readonly salt;

  constructor(private readonly configService: ConfigService) {
    this.password = configService.get<string>('ENCRYPTION_PASSWORD');
    this.salt = configService.get<string>('ENCRYPTION_SALT');
  }

  private async getKey(): Promise<Buffer> {
    return (await promisify(scrypt)(this.password, this.salt, 32)) as Buffer;
  }

  async encryptToken(token: string): Promise<string> {
    const key = await this.getKey();
    const iv = randomBytes(16); // Generate a unique IV
    const cipher = createCipheriv('aes-256-ctr', key, iv);
    const encryptedToken = Buffer.concat([
      cipher.update(token),
      cipher.final(),
    ]);
    return `${iv.toString('hex')}${encryptedToken.toString('hex')}`;
  }

  async decryptToken(encrypted: string): Promise<string> {
    const [ivHex, encryptedTokenHex] = encrypted.split(':');
    const iv = Buffer.from(ivHex, 'hex');
    const encryptedToken = Buffer.from(encryptedTokenHex, 'hex');
    const key = await this.getKey();
    const decipher = createDecipheriv('aes-256-ctr', key, iv);
    const decryptedToken = Buffer.concat([
      decipher.update(encryptedToken),
      decipher.final(),
    ]);
    return decryptedToken.toString();
  }
}
