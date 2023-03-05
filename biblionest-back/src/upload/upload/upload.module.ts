import { Logger, Module } from '@nestjs/common';
import { UploadsController } from './upload.controller';
import { UploadService } from './upload.service';

@Module({
  controllers: [UploadsController],
  providers: [UploadService, Logger],
})
export class UploadModule {}
