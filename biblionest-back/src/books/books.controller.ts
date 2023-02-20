import { Body, Controller, Post } from "@nestjs/common";
import { BooksService } from "./books.service";
import { BooksDto } from "./dto";

@Controller("books")
export class BooksController {
  constructor(private booksService: BooksService) {}

  @Post("addBook")
  signup(@Body() dto: BooksDto) {
    return this.booksService.createBook(dto);
  }
}
