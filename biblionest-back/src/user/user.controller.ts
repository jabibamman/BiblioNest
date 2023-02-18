import { Controller, Get, Req, UseGuards } from "@nestjs/common";
import { Request } from "express";
import { JwtGuard } from "../auth/guard";

@Controller("profile")
export class UserController {
  @UseGuards(JwtGuard)
  @Get("") // http://localhost:3000/profile
  getMe(@Req() req: Request) {
    return req.user;
  }
}
