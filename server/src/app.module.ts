import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { ProductModule } from './product/product.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { AuthModule } from './auth/auth.module';
import { UtilsModule } from './utils/utils.module';


import configuration from './config/configuration';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from './user/user.module';


@Module({
  imports: [
    ConfigModule.forRoot(),
    PrismaModule,
    ConfigModule.forRoot({ isGlobal: true, load: [configuration] }),
    ProductModule,
    CloudinaryModule,
    AuthModule,
    UtilsModule,

    JwtModule.register({
      global:true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' }
    }),

    UserModule
    
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
