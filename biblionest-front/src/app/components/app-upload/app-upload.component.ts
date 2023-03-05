import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AppUploadService } from './app-upload.service';

@Component({
  selector: 'app-app-upload',
  templateUrl: './app-upload.component.html',
  styleUrls: ['./app-upload.component.css']
})
export class AppUploadComponent {
  fileUrl: string | undefined;

  constructor(private uploadsService: AppUploadService) {}

  getFile(): void {
    //ici
    console.log('ici');
    
    this.uploadsService.getFile('1677962387070-805000771Capture.PNG').subscribe(file => {
      const urlCreator = window.URL || window.webkitURL;
      this.fileUrl = urlCreator.createObjectURL(file);
    });
  }

}
