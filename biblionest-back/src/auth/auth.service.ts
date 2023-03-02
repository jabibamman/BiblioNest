import { ForbiddenException, Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService, private readonly logger: Logger) {}

    errorMessages : any = {
        'P2002': 'Credentials are already used',
        'userNotFound': 'User not found',
        'passwordIncorrect': 'Incorrect password',
    };

    async signup(dto: AuthDto) {
        //generate the password hash
        const hash = await argon.hash(dto.password);



        //save the new user in the db
        try {
            const user = await this.prisma.user.create({
                data: {
                    email: dto.email,
                    hash,
                },
            });

            delete user.hash;

            //return the saved user
            return user;
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    this.logger.error(`${this.signup.name[0].toUpperCase()}${this.signup.name.slice(1)} - ${this.errorMessages.P2002}`, `${this.constructor.name}`);
                    throw new ForbiddenException(
                        this.errorMessages.P2002,
                    );    
                }
            }
            throw error;
        }
    }
    async signin(dto: AuthDto) {
        // find the user by email
        const user = await this.prisma.user.findUnique({
            where: {
                email: dto.email,
            },
        });

        // if user does not exist throw exception
        if (!user) {
            this.logger.error(`${this.signup.name[0].toUpperCase()}${this.signup.name.slice(1)} - ${this.errorMessages.userNotFound}`, `${this.constructor.name}`);
            throw new ForbiddenException(this.errorMessages.userNotFound);
        }

        // compare passwords
        const pwdMatches = await argon.verify(user.hash, dto.password);

        // if passwords incorrect throw exception
        if (!pwdMatches) {
            this.logger.error(`${this.signup.name[0].toUpperCase()}${this.signup.name.slice(1)} - ${this.errorMessages.passwordIncorrect}`, `${this.constructor.name}`);
            throw new ForbiddenException(this.errorMessages.passwordIncorrect);
        }

        // send back the user
        delete user.hash;
        return user;
    }
}
