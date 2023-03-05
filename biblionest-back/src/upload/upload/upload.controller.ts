import { Controller, Get, Param, Post, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { writeFile } from 'fs';
import * as path from "path";


@Controller('uploads')
export class UploadsController {
    @Post("upload")
    @UseInterceptors(FileInterceptor("image"))
    async uploadFile(@UploadedFile() file: Express.Multer.File) {
        console.log(file);

        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);

        file.originalname = uniqueSuffix + file.originalname;

        const filepath = path.join(
        __dirname,
        "../../../uploads",
        file.originalname
        );
        writeFile(filepath, file.buffer, (err) => {
        if (err) {
            console.error(err);
        } else {
            console.log("Fichier enregistré avec succès :", filepath);
        }
        });

        return file;
    }
  

  @Get(':filename')
  serveFile(@Param('filename') filename: string, @Res() res: Response) {
    console.log('filename : ' + filename);
    
    const filePath = path.join(__dirname, '../../../../uploads', filename); // chemin absolu du fichier
    return res.sendFile(filePath);
  }
}