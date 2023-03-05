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
  Logger,
  Query,
  Param,
} from "@nestjs/common";
import { BooksService } from "./books.service";
import { BooksDto } from "./dto";
import { FileInterceptor } from "@nestjs/platform-express";
import * as path from "path";
import { writeFile } from "fs";

@Controller("books")
export class BooksController {
  constructor(private booksService: BooksService, private logger: Logger) {}

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
        this.logger.error(`${this.uploadFile.name[0].toUpperCase()}${this.uploadFile.name.slice(1)} - "${file.originalname}" failed to upload`, `${this.constructor.name}`);
      } else {
        this.logger.log(`${this.uploadFile.name[0].toUpperCase()}${this.uploadFile.name.slice(1)} - "${file.originalname}" successfully uploaded`, `${this.constructor.name}`);
      }
    });

    return file;
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