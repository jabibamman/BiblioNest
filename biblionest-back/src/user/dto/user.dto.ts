import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator"

export class UserDto {
    @IsNotEmpty()
    @IsNumber()
    @ApiProperty()
    id: number;

    @IsNotEmpty()
    @ApiProperty()
    createAt: Date;

    @IsNotEmpty()
    @ApiProperty()
    updatedAt: Date;

    @IsNotEmpty()
    @ApiProperty()
    @IsString()
    username: string;

    @IsNotEmpty()
    @ApiProperty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @ApiProperty()
    @IsString()
    hash: string;
}
