import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  Get,
  Logger,
  Query,
  Param,
  Res,
} from "@nestjs/common";
import { BooksService } from "./books.service";
import { BooksDto } from "./dto";
import { FileInterceptor } from "@nestjs/platform-express";
import * as path from "path";
import { writeFile } from "fs";
import { log } from "console";
import { Response } from 'express';
import { join } from "path";
import { Observable } from "rxjs";

@Controller("books")
export class BooksController {
  constructor(private booksService: BooksService, private logger: Logger) {}

  @Post("addBook")
  signup(@Body() dto: BooksDto) {
    return this.booksService.createBook(dto);
  }


    @Get("getAllBooks")
    async getBooks() {        
        this.logger.log(`${this.getBooks.name[0].toUpperCase()}${this.getBooks.name.slice(1)} - All books`, `${this.constructor.name}`);
        return this.booksService.getBooks();
    }

    @Get("getAllBooks/:id")
    async getBooksUserById(@Param('id') id: number) {
        this.logger.log(`${this.getBooksUserById.name[0].toUpperCase()}${this.getBooksUserById.name.slice(1)} - All books from user with id: ${id}`, `${this.constructor.name}`);
        return this.booksService.getBooksUser(id);
    }
}