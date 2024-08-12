import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { signInDTO, signupDTO } from './dto';
import * as bcrypt from 'bcryptjs'

@Controller('auth')
export class AuthController {
    constructor(private authService:AuthService){}

    @Post('/sign-in')
    async signin(@Body() dto:signInDTO){
        console.log(dto);
        return this.authService.signIn(dto.username,dto.password)
    }
    @Post('/sign-up')
    async signUp(@Body() dto:signupDTO){
        const existingUser = await this.authService.getUserByUsernameOrEmail(dto.email,dto.username);
        if(existingUser){
            throw new BadRequestException('user already registered with this username or email');
        }
        return this.authService.register(dto);
    }
}
