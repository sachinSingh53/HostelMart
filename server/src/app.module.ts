import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { ProductModule } from './product/product.module';

import configuration from './config/configuration';


@Module({
  
  imports: [ConfigModule.forRoot(), PrismaModule,ConfigModule.forRoot({isGlobal:true, load: [configuration]}), ProductModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
