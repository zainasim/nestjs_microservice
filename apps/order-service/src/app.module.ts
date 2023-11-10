import { Module } from '@nestjs/common';
import { OrdersModule } from './orders/orders.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from '@app/common/database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: './apps/nestjs-prisma/.env',
      isGlobal: true,
    }),
    DatabaseModule,
    OrdersModule,
  ],
})
export class AppModule {}
