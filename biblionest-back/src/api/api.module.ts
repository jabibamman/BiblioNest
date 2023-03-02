import { HttpModule } from "@nestjs/axios";
import { Module } from '@nestjs/common';
import { ApiController } from './api.controller';
import { ApiService } from './api.service';
import { Logger } from '@nestjs/common';

@Module({
    imports: [HttpModule],
    controllers: [ApiController],
    providers: [ApiService, Logger],
})
export class ApiModule {}
