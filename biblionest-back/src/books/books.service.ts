import { ForbiddenException, HttpCode, Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
//import { BooksDto } from "./dto";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { Prisma } from "@prisma/client";

@Injectable()
export class BooksService {
    constructor(private prisma: PrismaService) {}
   
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