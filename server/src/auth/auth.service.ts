import {
  BadRequestException,
  ForbiddenException,
  HttpException,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { signInDTO, signupDTO } from './dto';
import { UtilsService } from 'src/utils/utils.service';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private utils: UtilsService,
    private jwtService: JwtService,
  ) {}

  async signIn(username: string, password: string) {
    let existingUser: any;

    if (!this.utils.isEmail(username)) {
      existingUser = await this.getUserByUsername(username);
    } else {
      existingUser = await this.getUserByEmail(username);
    }

    if (!existingUser) {
      throw new ForbiddenException('invalid credentials');
    }

    const isPasswordMatch = await bcrypt.compare(
      password,
      existingUser.password,
    );
    if (!isPasswordMatch) {
      throw new ForbiddenException('invalid credentials');
    }

    delete existingUser.password;
    const payload = {
      id: existingUser.id,
      username: existingUser.username,
      email: existingUser.email,
    };

    const access_token = this.jwtService.sign(payload);

    return {
      access_token,
      existingUser,
    };
  }

  async register(dto: signupDTO) {
    dto.password = await bcrypt.hash(dto.password, 10);
    const user = await this.prismaService.auth.create({
      data: dto,
    });

    const payload = {
      id: user.id,
      username: user.username,
      email: user.email,
    };
    delete user.password;
    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
  }

  getUserByEmail(email: string) {
    // console.log(email)
    return this.prismaService.auth.findFirst({
      where: {
        email,
      },
    });
  }

  getUserByUsername(username: string) {
    return this.prismaService.auth.findFirst({
      where: {
        username,
      },
    });
  }

  getUserByUsernameOrEmail(email: string, username: string) {
    return this.prismaService.auth.findFirst({
      where: {
        OR: [{ email }, { username }],
      },
    });
  }
}
