import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { signInDTO, signupDTO } from './dto';
import { UserService } from 'src/user/user.service';
import { BuyerDto } from 'src/user/dto';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Post('/sign-in')
  async signin(@Body() dto: signInDTO) {
    console.log(dto);
    return await this.authService.signIn(dto.username, dto.password);
  }

  @Post('/sign-up')
  async signUp(@Body() dto: signupDTO) {
    const existingUser = await this.authService.getUserByUsernameOrEmail(
      dto.email,
      dto.username,
    );
    if (existingUser) {
      throw new BadRequestException(
        'user already registered with this username or email',
      );
    }
    const authCreatedUser = await this.authService.register(dto);

    const buyer: BuyerDto = {
      email: authCreatedUser.user.email,
      username: authCreatedUser.user.username,
      purchased_products: [],
      favourites: [],
    };
    const createdBuyer = await this.userService.createBuyer(buyer);

    console.log('buyer created successfully ', createdBuyer);

    return authCreatedUser;
  }
}
