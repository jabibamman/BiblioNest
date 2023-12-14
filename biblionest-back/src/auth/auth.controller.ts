import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { SignupDto, SigninDto } from "./dto";
import { ApiBody, ApiTags } from "@nestjs/swagger";

@Controller("auth")
@ApiTags("Authentification")
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post("signup")
  @ApiBody({ type: SignupDto })
  signup(@Body() dto: SignupDto) {
    return this.authService.signup(dto);
  }

  @HttpCode(HttpStatus.OK)
  @Post("signin")
  @ApiBody({ type: SigninDto })
  signin(@Body() dto: SigninDto) {
    return this.authService.signin(dto);
  }
}
