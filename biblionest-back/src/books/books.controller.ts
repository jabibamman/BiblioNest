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
  Patch,
} from "@nestjs/common";
import { BooksService } from "./books.service";
import { BooksDto } from "./dto";

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
  async getBooksUserById(@Param("id") id: number) {
    return this.booksService.getBooksUser(id);
  }

  @Patch(":isbn")
  async updateBook(@Param("isbn") isbn: string, @Body() dto: BooksDto) {
    return this.booksService.updateBook(isbn, dto);
  }

  @Delete("delete/:id")
  async deletePost(@Param("id") id: string) {
    return this.booksService.deleteBook({ id: Number(id) });
  }
}
