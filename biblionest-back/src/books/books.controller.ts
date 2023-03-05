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
} from "@nestjs/common";
import { BooksService } from "./books.service";
import { BooksDto } from "./dto";
import { FileInterceptor } from "@nestjs/platform-express";
import * as path from "path";
import { writeFile } from "fs";

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

    @Get("getAllBooksUser")
        // this is an example of a postman request : 127.0.0.1:3000/books/getAllBooksUser {"userId": 1}
    async getBooksUserById(@Body() body) {
        return this.booksService.getBooksUser(body);
    }
}