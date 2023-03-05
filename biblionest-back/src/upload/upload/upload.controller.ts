import { Controller, Get, Param, Post, Res, UploadedFile, UseInterceptors, Logger } from '@nestjs/common';
import { Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { writeFile } from 'fs';
import * as path from "path";


@Controller('uploads')
export class UploadsController {
    constructor(private logger: Logger) {}

    pathUpload = "../../../../uploads"
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
          this.logger.error(`${this.uploadFile.name[0].toUpperCase()}${this.uploadFile.name.slice(1)} - "${file.originalname}" failed to upload`, `${this.constructor.name}`);
        } else {
          this.logger.log(`${this.uploadFile.name[0].toUpperCase()}${this.uploadFile.name.slice(1)} - "${file.originalname}" successfully uploaded`, `${this.constructor.name}`);
        }
      });
  
      return file;
    }
  

  @Get(':filename')
  serveFile(@Param('filename') filename: string, @Res() res: Response) {
    if (filename === 'default') {
      this.logger.log(`${this.serveFile.name[0].toUpperCase()}${this.serveFile.name.slice(1)} - Default image`, `${this.constructor.name}`);
       return;
    }
    
    const filePath = path.join(__dirname, this.pathUpload, filename); // chemin absolu du fichier
    this.logger.log(`${this.serveFile.name[0].toUpperCase()}${this.serveFile.name.slice(1)} - "${filename}"`, `${this.constructor.name}`);
    return res.sendFile(filePath);
  }
}