import { Controller, Get, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Controller("profile")
export class UserController {
  @UseGuards(AuthGuard(`jwt`))
  @Get() // http://localhost:3000/profile
  getMe() {
    return "You are logged in!!";
  }
}
