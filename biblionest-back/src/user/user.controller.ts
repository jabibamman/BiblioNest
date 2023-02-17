import { Controller, Get, Req, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Request } from "express";

@Controller("profile")
export class UserController {
  @UseGuards(AuthGuard(`jwt`))
  @Get("") // http://localhost:3000/profile
  getMe(@Req() req: Request) {
    return req.user;
  }
}
