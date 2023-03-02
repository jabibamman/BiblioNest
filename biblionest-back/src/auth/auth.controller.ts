import { Body, Controller, Logger, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService, private readonly logger: Logger) {}

    @Post('signup')
    signup(@Body() dto: AuthDto) {
        this.logger.log(`${this.signup.name[0].toUpperCase()}${this.signup.name.slice(1)} - ${JSON.stringify(dto)}`, `${this.constructor.name}`);
        return this.authService.signup(dto);
    }

    @Post('signin')
    signin(@Body() dto: AuthDto) {
        this.logger.log(`${this.signin.name[0].toUpperCase()}${this.signin.name.slice(1)} - ${JSON.stringify(dto)}`, `${this.constructor.name}`);
        return this.authService.signin(dto);
    }
}
