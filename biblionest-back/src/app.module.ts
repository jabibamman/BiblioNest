import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { ApiModule } from './api/api.module';

@Module({
    imports: [ApiModule, AuthModule, UserModule, PrismaModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
