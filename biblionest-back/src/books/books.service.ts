import { ForbiddenException, HttpCode, Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { BooksDto } from "./dto";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import {Prisma, status} from "@prisma/client";
import { ApiService } from "src/api/api.service";

@Injectable()
export class BooksService {
  constructor(private prisma: PrismaService, private apiService: ApiService) {}

  async createBook(dto: BooksDto) {
    try {
      return await this.prisma.book.create({
        data: {
          isbn:
            dto.isbn ||
            (await (
              await this.apiService.getBookByTitle(dto.title)
            ).isbn),
          title: dto.title,
          status: dto.status,
          readCount: dto.readCount,
          author: dto.author,
          publishedDate:
            dto.publishedDate ||
            (await (
              await this.apiService.getBookByTitle(dto.title)
            ).publishedDate),
          nbPages:
            dto.nbPages < 2
              ? await (
                  await this.apiService.getBookByTitle(dto.title)
                ).nbPages
              : dto.nbPages,
          description:
            dto.description ||
            (await (
              await this.apiService.getBookByTitle(dto.title)
            ).description),
          imgUrl:
            dto.imgUrl ||
            (await (
              await this.apiService.getBookByTitle(dto.title)
            ).imgUrl),
          userId: dto.userId,
        } as Prisma.BookCreateInput,
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
          throw new ForbiddenException("Book already exist");
        }
      }
      throw error;
    }
  }

  deleteBook(where: Prisma.BookWhereUniqueInput) {
    return this.prisma.book.delete({
      where,
    });
  }

  @HttpCode(200)
  getBooks() {
    if (this.prisma.book.findMany() === null) {
      throw new ForbiddenException();
    }
    return this.prisma.book.findMany();
  }

  async updateBook(isbn: string, dto: BooksDto) {
    try {
      return await this.prisma.book.update({
        where: {
          isbn: isbn,
        },
        data: {
          author: dto.author,
          description: dto.description,
          nbPages: dto.nbPages,
          publishedDate: dto.publishedDate,
          readCount: dto.readCount,
          title: dto.title,
          status: dto.status,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  @HttpCode(200)
  getBooksUser(id: number) {
    return this.prisma.book.findMany({
      where: {
        userId: Number(id),
      },
    });
  }
}
