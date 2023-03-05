import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  Get,
  Query,
  Param,
  Res,
  Delete,
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
  constructor(private booksService: BooksService) {}

  @Post("addBook")
  signup(@Body() dto: BooksDto) {
    return this.booksService.createBook(dto);
  }

    @Get("getAllBooks")
    async getBooks() {        
        return this.booksService.getBooks();
    }

    @Get("getAllBooks/:id")
    async getBooksUserById(@Param('id') id: number) {
        return this.booksService.getBooksUser(id);
    }
}
