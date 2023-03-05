import { Component } from '@angular/core';
import { AppUploadService } from './app-upload.service';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-app-upload',
  templateUrl: './app-upload.component.html',
  styleUrls: ['./app-upload.component.css']
})
export class AppUploadComponent {
  fileUrl: string | undefined;

  constructor(private uploadsService: AppUploadService, private DomSanitizer: DomSanitizer) {}

  getFile(): void {
    this.uploadsService.getFile('test.png').subscribe(file => {
      const urlCreator = window.URL || window.webkitURL;
      this.fileUrl = urlCreator.createObjectURL(file);  
    });
  }

  sanitize(url:string){
    return this.DomSanitizer.bypassSecurityTrustUrl(url);
}

}
