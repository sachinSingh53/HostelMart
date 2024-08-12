import { IsEmail, IsNotEmpty, IsString, IsStrongPassword, isString,IsOptional,ValidateIf } from "class-validator";



export class signInDTO {
    
    @IsString()
    username: string;

    @IsString()
    password: string;
}

export class signupDTO{
    @IsString()
    @IsNotEmpty()
    username: string

    @IsEmail()
    email:string;

    @IsStrongPassword()
    password: string
}