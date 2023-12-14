import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { UserModule } from "./user/user.module";
import { PrismaModule } from "./prisma/prisma.module";
import { ApiModule } from "./api/api.module";
import { existsSync, readFileSync, writeFileSync } from "fs";
import { BooksModule } from "./books/books.module";
import { MulterModule } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { ConfigModule } from "@nestjs/config";
import { UploadModule } from './upload/upload/upload.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ApiModule,
    AuthModule,
    BooksModule,
    UserModule,
    PrismaModule,
    MulterModule.register({
      storage: diskStorage({
        destination: "./../uploads",
      }),
    }),
    UploadModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  static setupEnv() {
    console.log("[INFO] Setup environment variables");
    const envBaseDir = "../.env";
    const envDir = ".env";
    const dotenv = require("dotenv");
    dotenv.config({ path: envDir });
    const isFileExist = existsSync(envDir);

    // réecrire le JWT_SECRET et le remplacer par une valeur aléatoire
    if (process.env.JWT_SECRET !== undefined) {
      // on le supprime du fichier .env
      const data = readFileSync(envDir, "utf8");
      writeFileSync(
        envDir,
        data.replace(`JWT_SECRET="${process.env.JWT_SECRET}"`, "")
        .replace(/\n$/, "")
      );
      writeFileSync(
        envDir,
        `\nJWT_SECRET="${
          Math.random().toString(36).substring(2, 15) +
          Math.random().toString(36).substring(2, 15)
        }"`,
        { flag: "a" }
      );
    } else {
      writeFileSync(
        envDir,
        `\nJWT_SECRET="${
          Math.random().toString(36).substring(2, 15) +
          Math.random().toString(36).substring(2, 15)
        }"`,
        { flag: "a" }
      );
    }

    if (process.env.DATABASE_URL === undefined) {
      dotenv.config({ path: envBaseDir });
      writeFileSync(
        envDir,
        `\nDATABASE_URL="postgresql://${process.env.PGUSER}:${process.env.PGPASSWORD}@${process.env.PGHOST}:${process.env.PGPORT}/${process.env.PGDATABASE}?schema=public"`,
        { flag: "a" }
      );
    }

    dotenv.config({ path: envDir });
    if (process.env.DATABASE_URL === undefined) {
      throw new Error("[ERROR] DATABASE_URL is undefined");
    }

    if (!isFileExist) {
      process.exit(0);
    }
  }
}
