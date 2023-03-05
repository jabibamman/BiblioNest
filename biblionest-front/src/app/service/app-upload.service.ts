import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {DomSanitizer} from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class AppUploadService {
  private apiUrl = 'http://localhost:3000/uploads';

  constructor(private http: HttpClient, private DomSanitizer: DomSanitizer) { }

  getFile(filename: string): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/${filename}`, { responseType: 'blob' });
  }

  sanitize(url:string) {
    return this.DomSanitizer.bypassSecurityTrustUrl(url);
  }




    
}
