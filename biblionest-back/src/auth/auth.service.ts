import { ForbiddenException, Injectable, Logger } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { SigninDto, SignupDto } from "./dto";
import * as argon from "argon2";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
    private readonly logger: Logger
  ) {}

  errorMessages : any = {
    'P2002': 'Credentials are already used',
    'userNotFound': 'User not found',
    'passwordIncorrect': 'Incorrect password',
  };

  async signup(dto: SignupDto) {
    //generate the password hash
    const hash = await argon.hash(dto.password);
    //save the new user in the db
    try {
      const user = await this.prisma.user.create({
        data: {
          username: dto.username,
          email: dto.email,
          hash,
        },
      });

      return this.signToken(user.id, user.email);
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === this.errorMessages.P2002) {
          this.logger.error(`${this.signup.name[0].toUpperCase()}${this.signup.name.slice(1)} - ${this.errorMessages.P2002}`, `${this.constructor.name}`);
          throw new ForbiddenException(this.errorMessages.P2002);
        }
      }
      throw error;
    }
  }

  async signin(dto: SigninDto) {
    // find the user by email
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    // if user does not exist throw exception
    if (!user) {
      this.logger.error(`${this.signin.name[0].toUpperCase()}${this.signin.name.slice(1)} - ${this.errorMessages.userNotFound}`, `${this.constructor.name}`);
      throw new ForbiddenException(this.errorMessages.userNotFound);
    }

    // compare passwords
    const pwdMatches = await argon.verify(user.hash, dto.password);

    // if passwords incorrect throw exception
    if (!pwdMatches) {
     this.logger.error(`${this.signin.name[0].toUpperCase()}${this.signin.name.slice(1)} - ${this.errorMessages.passwordIncorrect}`, `${this.constructor.name}`);
      throw new ForbiddenException(this.errorMessages.passwordIncorrect);
    }

    return this.signToken(user.id, user.email);
  }

  signToken(userId: number, email: string): Promise<string> {
    const payload = {
      sub: userId,
      email,
    };

    const secret = this.config.get("JWT_SECRET");
    return this.jwt.signAsync(payload, {
      expiresIn: "30m",
      secret: secret,
    });
  }

  getUserByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: {
        email,
      },
    });
  }
}