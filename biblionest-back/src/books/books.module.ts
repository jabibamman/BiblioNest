import { HttpModule } from "@nestjs/axios";
import { Logger, Module } from "@nestjs/common";
import { ApiModule } from "src/api/api.module";
import { BooksController } from "./books.controller";
import { BooksService } from "./books.service";

@Module({
  controllers: [BooksController],
  providers: [BooksService, Logger],
  imports: [ApiModule, HttpModule],
  
})
export class BooksModule {}
