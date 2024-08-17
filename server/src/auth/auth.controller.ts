import { BadRequestException, Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { signInDTO, signupDTO } from './dto';


@Controller('auth')
export class AuthController {
    constructor(private authService:AuthService){}

    @HttpCode(HttpStatus.OK)
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
