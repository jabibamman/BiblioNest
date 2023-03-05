import { Body, Controller, HttpCode, HttpStatus, Logger, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { SignupDto, SigninDto } from "./dto";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService, private logger: Logger) {}

  @Post("signup")
  signup(@Body() dto: SignupDto) {
    this.logger.log(`${this.signup.name[0].toUpperCase()}${this.signup.name.slice(1)} - ${JSON.stringify(dto)}`, `${this.constructor.name}`);
    return this.authService.signup(dto);
  }

  @HttpCode(HttpStatus.OK)
  @Post("signin")
  signin(@Body() dto: SigninDto) {
    this.logger.log(`${this.signin.name[0].toUpperCase()}${this.signin.name.slice(1)} - ${JSON.stringify(dto)}`, `${this.constructor.name}`);
    return this.authService.signin(dto);
  }
}
