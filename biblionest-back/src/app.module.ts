import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { UserModule } from "./user/user.module";
import { PrismaModule } from "./prisma/prisma.module";
import { ApiModule } from "./api/api.module";
import { writeFileSync } from "fs";
import { BooksModule } from "./books/books.module";

@Module({
  imports: [ApiModule, AuthModule, BooksModule, UserModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  static setupEnv() {
    const envDir = "../.env";
    const dotenv = require("dotenv");
    dotenv.config({ path: envDir });
    if (process.env.DATABASE_URL === undefined) {
      writeFileSync(
        envDir,
        `\nDATABASE_URL="postgresql://${process.env.PGUSER}:${process.env.PGPASSWORD}@${process.env.PGHOST}:${process.env.PGPORT}/${process.env.PGDATABASE}?schema=public"`,
        { flag: "a" }
      );
    }

    dotenv.config({ path: envDir }); // reload '../.env' file

    if (process.env.DATABASE_URL === undefined) {
      throw new Error("[ERROR] DATABASE_URL is undefined");
    }
  }
}
