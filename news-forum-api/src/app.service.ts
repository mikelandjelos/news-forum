import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class AppService {
  constructor(private readonly pgDataSource: DataSource) {}

  getHello(): string {
    return 'Hello World!';
  }

  async getPing(): Promise<string> {
    return (await this.pgDataSource.query<string>('SELECT 1'))
      ? 'PONG'
      : 'UNAVAILABLE';
  }
}
