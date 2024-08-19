import { IsEmail, IsNotEmpty, IsString } from "class-validator";


export class BuyerDto{

    @IsNotEmpty()
    @IsEmail()
    email:string

    @IsNotEmpty()
    @IsString()
    username: string

    @IsString({ each: true })
    purchased_products: []

    @IsString({each:true})
    favourites: []
    
}