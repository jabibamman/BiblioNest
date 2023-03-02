import { Logger, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { ApiModule } from './api/api.module';
import { writeFileSync } from 'fs';

@Module({
    imports: [ApiModule, AuthModule, UserModule, PrismaModule],
    controllers: [AppController],
    providers: [AppService, Logger],
})
export class AppModule {
    static logger: Logger;
    static setupEnv() {
        AppModule.logger = new Logger();
        this.logger.log(`${this.setupEnv.name[0].toUpperCase()}${this.setupEnv.name.slice(1)} - Setup environment variables`,  `${this.constructor.name}`);
        const envBaseDir = "../.env"
        const envDir = ".env";
        const dotenv = require('dotenv');
        dotenv.config({path: envDir});
        if (process.env.DATABASE_URL === undefined) {
            dotenv.config({ path: envBaseDir }); 
            writeFileSync(envDir, `\nDATABASE_URL="postgresql://${process.env.PGUSER}:${process.env.PGPASSWORD}@${process.env.PGHOST}:${process.env.PGPORT}/${process.env.PGDATABASE}?schema=public"`, { flag: 'a' });
        }

        dotenv.config({ path: envDir });
        if (process.env.DATABASE_URL === undefined) {
            const dbUndefinedMessage = 'DATABASE_URL is undefined';
            this.logger.error(`${this.setupEnv.name[0].toUpperCase()}${this.setupEnv.name.slice(1)} - ${dbUndefinedMessage}`,  `${this.constructor.name}`);
            throw new Error(`[ERROR] ${dbUndefinedMessage}`);
        }
    }
}
