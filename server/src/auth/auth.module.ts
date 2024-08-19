import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategy';
import { UserService } from 'src/user/user.service';
// import { JwtModule } from '@nestjs/jwt';

@Module({
  // imports:[JwtModule.register({

  // })],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, UserService],
})
export class AuthModule {}
