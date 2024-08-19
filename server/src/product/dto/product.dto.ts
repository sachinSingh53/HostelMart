import { locationEnum } from '@prisma/client';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsArray,
  ArrayNotEmpty,
  IsEnum,
  IsDate,
  IsEmail,
} from 'class-validator';

export class ProductDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsString()
  @IsNotEmpty()
  description: string;

  // @IsBoolean()
  active: boolean;

  // @IsArray()
  // @ArrayNotEmpty()
  // @IsString({ each: true })  // Ensure each element in the array is a string
  photos: string[];

  @IsEnum(locationEnum)
  location: locationEnum;

  @IsNumber()
  year_of_purchase: number;

  @IsString()
  brand_name: string;

  @IsString()
  seller_id: number;

  @IsString()
  username: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  category: string;
}
