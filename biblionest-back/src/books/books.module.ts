import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { ApiModule } from "src/api/api.module";
import { BooksController } from "./books.controller";
import { BooksService } from "./books.service";

@Module({
  controllers: [BooksController],
  providers: [BooksService],
  imports: [ApiModule, HttpModule],
})
export class BooksModule {}
