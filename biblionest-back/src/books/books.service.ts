import { ForbiddenException, HttpCode,Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { BooksDto } from "./dto";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { Prisma } from "@prisma/client";
import { ApiService } from "src/api/api.service";
import { Logger } from "@nestjs/common";

@Injectable()
export class BooksService {
  constructor(private prisma: PrismaService, private apiService: ApiService, private logger: Logger) {}
  errorMessages : any = {
    'P2002': 'Book already exist',
  };

  async createBook(dto: BooksDto) {
    try {
      return await this.prisma.book.create({
        data: {
          isbn: dto.isbn || await (await this.apiService.getBookByTitle(dto.title)).isbn,
          title: dto.title,
          status: dto.status,
          readCount: dto.readCount,
          author: dto.author,
          publishedDate: dto.publishedDate || await (await this.apiService.getBookByTitle(dto.title)).publishedDate,
          nbPages: (dto.nbPages < 2) ? await (await this.apiService.getBookByTitle(dto.title)).nbPages : dto.nbPages,
          description: dto.description || await (await this.apiService.getBookByTitle(dto.title)).description,
          imgUrl: dto.imgUrl || await (await this.apiService.getBookByTitle(dto.title)).imgUrl,
          userId: dto.userId,
        } as Prisma.BookCreateInput,
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === this.errorMessages.P2002) {
          this.logger.error(`${this.createBook.name[0].toUpperCase()}${this.createBook.name.slice(1)} - ${this.errorMessages.P2002}`, `${this.constructor.name}`);
          throw new ForbiddenException(this.errorMessages.P2002);
        }
      }
      throw error;
    }
  }
    @HttpCode(200)
    getBooks() {
        if (this.prisma.book.findMany() === null) {
            this.logger.error(`${this.getBooks.name[0].toUpperCase()}${this.getBooks.name.slice(1)} - No books found`, `${this.constructor.name}`);
            throw new ForbiddenException();
        }
        
        this.logger.log(`${this.getBooks.name[0].toUpperCase()}${this.getBooks.name.slice(1)} - Books found`, `${this.constructor.name}`);
        return this.prisma.book.findMany();
    }

    @HttpCode(200)
    getBooksUser(id: number) {
        if (this.prisma.book.findMany() === null) {
            this.logger.error(`${this.getBooksUser.name[0].toUpperCase()}${this.getBooksUser.name.slice(1)} - No books found for user ${id}`, `${this.constructor.name}`);
            throw new ForbiddenException();
        }
        
        this.logger.log(`${this.getBooksUser.name[0].toUpperCase()}${this.getBooksUser.name.slice(1)} - Books found for user ${id}`, `${this.constructor.name}`);
        return this.prisma.book.findMany({
            where: {
                userId: Number(id)
            }
        });
    }
}