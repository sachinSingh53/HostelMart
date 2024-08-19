import { BadRequestException, Body, Controller, ForbiddenException, Get, HttpException, HttpStatus, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from 'src/auth/decorators';
import { AuthGuard } from '@nestjs/passport';
import { BuyerDto, SellerDto } from './dto';


@UseGuards(AuthGuard('jwt'))
@Controller('user')
export class UserController {
    constructor(private userService: UserService) { }

    //buyer routes
    @Get('buyer/:id')
    async getBuyerById(@Param('id', ParseIntPipe) id: number) {
        return await this.userService.getBuyerById(id);
    }

    @Get('buyer/:username')
    async getBuyerByUsername(@Param('username') username: string) {
        return await this.userService.getBuyerByUsername(username);
    }

    @Get('buyer/current')
    async getCurrentBuyer(@User() user) {
        const currentUser = user?.username;
        if (!currentUser) {
            throw new HttpException('unable to get username of current user', HttpStatus.BAD_REQUEST);
        }

        return await this.userService.getBuyerByUsername(user.username);
    }

    @Get('buyer/:email')
    async getBuyerByEmail(@Param('email') email: string) {
        return await this.userService.getBuyerByEmail(email)
    }

    @Post('buyer')
    async createBuyer(@Body() dto: BuyerDto) {
        const existingBuyer = await this.userService.getBuyerByEmail(dto.email);
        if (existingBuyer) {
            throw new HttpException('Buyer already exists with this email', HttpStatus.BAD_REQUEST);
        }
        return await this.userService.createBuyer(dto);
    }

    @Put('buyer/:id')
    async updateBuyer(
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: BuyerDto
    ) {
        return await this.userService.updateBuyer(id, dto);
    }

    //seller routes
    @Get('seller/:id')
    async getSellerById(@Param('id', ParseIntPipe) id: number) {
        return await this.userService.getSellerById(id);
    }

    @Get('seller/:username')
    async getSellerByUsername(@Param('username') username: string) {
        return await this.userService.getSellerByUsername(username)

    }

    @Get('seller/current')
    async getCurrentSeller(@User() user){
        const currentUser = user.username
        if(!currentUser){
            throw new HttpException('can not find current username',HttpStatus.BAD_REQUEST);
        }
        return await this.userService.getSellerByUsername(currentUser);
    }

    @Get('seller/:email')
    async getSellerByEmail(@Param('email') email:string){
        return await this.userService.getSellerByEmail(email);
    }

    @Post('seller')
    async createSeller(@Body() dto:SellerDto){
        const existingUser = await this.userService.getSellerByEmail(dto.email);

        if(existingUser){
            throw new BadRequestException('seller already exist with this email')
        }

        return await this.userService.createSeller(dto);
    }

    @Put('seller/:id')
    async updateSeller(
        @Param('id',ParseIntPipe) id:number,
        @Body() dto:SellerDto
        ){
        return await this.userService.updateSeller(id,dto)
    }


}


