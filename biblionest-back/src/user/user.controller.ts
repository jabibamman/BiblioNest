import { Controller, Get, UseGuards } from "@nestjs/common";
import { GetUser } from "../auth/decorator";
import { JwtGuard } from "../auth/guard";
import { User } from "@prisma/client";

@UseGuards(JwtGuard)
@Controller("profile")
export class UserController {
  @Get("") // http://localhost:3000/profile
  getMe(@GetUser() user: User) {
    return user;
  }
}
