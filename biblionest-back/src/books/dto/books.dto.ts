import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Type } from "class-transformer";

export class BooksDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  status: string;

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
