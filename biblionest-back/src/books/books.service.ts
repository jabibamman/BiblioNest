import { ForbiddenException, HttpCode,Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { BooksDto } from "./dto";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { Prisma } from "@prisma/client";

@Injectable()
export class BooksService {
  constructor(private prisma: PrismaService) {}
  async createBook(dto: BooksDto) {
    try {
      return await this.prisma.book.create({
        data: {
          isbn: dto.isbn,
          title: dto.title,
          status: dto.status,
          readCount: dto.readCount,
          author: dto.author,
          publishedDate: dto.publishedDate,
          nbPages: dto.nbPages,
          description: dto.description,
          imgUrl: dto.imgUrl,
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
    @HttpCode(200)
    getBooks() {
        if (this.prisma.book.findMany() === null) {
            throw new ForbiddenException();
        }
        
        return this.prisma.book.findMany();
    }

    @HttpCode(200)
    getBooksUser(body: Prisma.BookWhereInput) {
        return this.prisma.book.findMany({
            where: {
                userId: Number(body.userId)
            }
        });
    }
}