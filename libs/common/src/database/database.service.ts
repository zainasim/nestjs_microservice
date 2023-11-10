import {
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class DatabaseService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  private logger: Logger;
  constructor() {
    super();
    this.logger = new Logger(DatabaseService.name);
  }
  async onModuleInit() {
    await this.$connect();
    this.logger.log('[-] connected to prisma client!');
  }
  async onModuleDestroy() {
    await this.$disconnect();
  }
}
