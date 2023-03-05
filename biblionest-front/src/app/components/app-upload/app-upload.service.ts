import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppUploadService {
  private apiUrl = 'http://localhost:3000/uploads';

  constructor(private http: HttpClient) {}

  getFile(filename: string): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/${filename}`, { responseType: 'blob' });
  }
}
