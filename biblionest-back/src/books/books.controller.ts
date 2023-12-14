import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  Delete,
  Patch,
} from "@nestjs/common";
import { BooksService } from "./books.service";
import { BooksDto } from "./dto";
import { ApiBody, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";

@Controller("books")
@ApiTags("Books")
export class BooksController {
  constructor(private booksService: BooksService) {}

  @Post("addBook")
  @ApiBody({ type: BooksDto })
  signup(@Body() dto: BooksDto) {
    return this.booksService.createBook(dto);
  }

  @Get("getAllBooks")
  @ApiResponse({
    status: 200,
    description: "A list of books",
    type: BooksDto,
  })
  async getBooks() {
      return this.booksService.getBooks();
  }

  @Get("getAllBooks/:id")
  @ApiParam({ name: "id", type: String })
  @ApiResponse({
    status: 200,
    description: "A list of books by user",
    type: BooksDto,
  })
  async getBooksUserById(@Param("id") id: number) {
    return this.booksService.getBooksUser(id);
  }

  @Patch(":isbn")
  @ApiBody({ type: BooksDto })
  @ApiParam({ name: "isbn", type: String })
  async updateBook(@Param("isbn") isbn: string, @Body() dto: BooksDto) {
    return this.booksService.updateBook(isbn, dto);
  }

  @Delete("delete/:id")
  @ApiParam({ name: "id", type: String })
  async deletePost(@Param("id") id: string) {
    return this.booksService.deleteBook({ id: Number(id) });
  }
}
