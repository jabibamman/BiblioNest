import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class AuthDto {
  username: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
