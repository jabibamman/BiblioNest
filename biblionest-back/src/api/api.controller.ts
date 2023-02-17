import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Query,
} from "@nestjs/common";
import { ApiService } from "./api.service";

@Controller("api")
export class ApiController {
  constructor(private apiService: ApiService) {}

  @Get("/gbook")
  async getBook(@Query() query: any) {
    if (query.title) {
      return await this.apiService.getGbook("title", query.title);
    } else if (query.author) {
      return await this.apiService.getGbook("author", query.author);
    } else if (query.publisher) {
      return await this.apiService.getGbook("publisher", query.publisher);
    } else if (query.isbn) {
      return await this.apiService.getGbook("isbn", query.isbn);
    } else {
      throw new HttpException(
        {
          status: HttpStatus.BAD_GATEWAY,
          error: "Invalid search type",
          message: "Please provide a valid search type",
        },
        HttpStatus.BAD_GATEWAY
      );
    }
  }
}
