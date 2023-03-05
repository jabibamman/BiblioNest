import {
  Body,
  Controller,
  FileTypeValidator,
  HttpStatus,
  ParseFilePipe,
  ParseFilePipeBuilder,
  Post,
  UploadedFile,
  UseInterceptors,
  Get,
  Query,
  Param,
} from "@nestjs/common";
import { BooksService } from "./books.service";
import { BooksDto } from "./dto";
import { FileInterceptor } from "@nestjs/platform-express";
import * as path from "path";
import { writeFile } from "fs";
import { log } from "console";

@Controller("books")
export class BooksController {
  constructor(private booksService: BooksService) {}

  @Post("addBook")
  signup(@Body() dto: BooksDto) {
    return this.booksService.createBook(dto);
  }

  @Post("upload")
  @UseInterceptors(FileInterceptor("image"))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log(file);

    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);

    file.originalname = uniqueSuffix + file.originalname;

    const filepath = path.join(
      __dirname,
      "../../../uploads",
      file.originalname
    );
    writeFile(filepath, file.buffer, (err) => {
      if (err) {
        console.error(err);
      } else {
        console.log("Fichier enregistré avec succès :", filepath);
      }
    });

    return file;
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