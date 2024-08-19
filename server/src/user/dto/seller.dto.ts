import { locationEnum } from "@prisma/client"
import { IsEmail, IsEnum, IsNotEmpty, IsNumber, IsString, isNotEmpty } from "class-validator"




export class SellerDto{
    @IsNotEmpty()
    @IsString()
    full_name:string

    @IsNotEmpty()
    @IsString()
    username: string

    @IsNotEmpty()
    @IsEmail()
    email: string

    @IsString()
    profile_picture: string 

    @IsString()
    hostel_id: string

    @IsNotEmpty()
    @IsEnum(locationEnum)
    hostel_name: locationEnum

    @IsNotEmpty()
    @IsNumber()
    room_no: number

    @IsNotEmpty()
    @IsNumber()
    year: number

    @IsNotEmpty()
    @IsString()
    branch:string

    @IsString()
    addmission_no:string

    @IsNotEmpty()
    @IsNumber()
    roll_no:number

}