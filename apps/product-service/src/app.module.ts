import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ProductsModule } from './products/products.module';
import { DatabaseModule } from '@app/common/database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: './apps/nestjs-prisma/.env',
      isGlobal: true,
    }),
    DatabaseModule,
    ProductsModule,
  ],
})
export class AppModule {}
