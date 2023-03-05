import {IsNotEmpty, IsOptional, IsString, Validate} from "class-validator";
import { Type } from "class-transformer";

export class BooksDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @Validate((value: string) => isValidEnumValue(status, value))
  status: any;

  @Type(() => Number)
  @IsNotEmpty()
  userId: number;

  @IsOptional()
  @IsString()
  isbn: string;

  @IsOptional()
  @Type(() => Number)
  readCount?: number;

  @IsString()
  @IsOptional()
  author?: string;

  @IsString()
  @IsOptional()
  publishedDate?: string;

  @Type(() => Number)
  @IsOptional()
  nbPages?: number;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  imgUrl?: string;
}

function isValidEnumValue(enumType: any, value: any): boolean {
  const keys = Object.keys(enumType);
  return keys.includes(value);
}
