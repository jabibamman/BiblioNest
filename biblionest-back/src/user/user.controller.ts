import { Controller, Get, UseGuards } from "@nestjs/common";
import { GetUser } from "../auth/decorator";
import { JwtGuard } from "../auth/guard";
import { User } from "@prisma/client";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { UserDto } from "./dto/user.dto";

@UseGuards(JwtGuard)
@Controller("profile")
@ApiTags("Profile")
export class UserController {
  @Get("") // http://localhost:3000/profile
  @ApiResponse({
    status: 200,
    description: "The found record",
    type: UserDto
  })
  getMe(@GetUser() user: User) : UserDto {
    return user;
  }
}
