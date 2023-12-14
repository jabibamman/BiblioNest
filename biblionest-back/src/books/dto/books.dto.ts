import {IsNotEmpty, IsOptional, IsString, Validate} from "class-validator";
import { Type } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";

export class BooksDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  title: string;

  @IsNotEmpty()
  @ApiProperty()
  @Validate((value: string) => isValidEnumValue(status, value))
  status: any;

  @Type(() => Number)
  @ApiProperty()
  @IsNotEmpty()
  userId: number;

  @IsOptional()
  @ApiProperty()
  @IsString()
  isbn: string;

  @IsOptional()
  @ApiProperty()
  @Type(() => Number)
  readCount?: number;

  @IsString()
  @ApiProperty()
  @IsOptional()
  author?: string;

  @IsString()
  @ApiProperty()
  @IsOptional()
  publishedDate?: string;

  @Type(() => Number)
  @IsOptional()
  @ApiProperty()
  nbPages?: number;

  @IsString()
  @ApiProperty()
  @IsOptional()
  description?: string;

  @IsString()
  @ApiProperty()
  @IsOptional()
  imgUrl?: string;
}

function isValidEnumValue(enumType: any, value: any): boolean {
  const keys = Object.keys(enumType);
  return keys.includes(value);
}
