import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpErrorResponse, HttpEventType } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {


  private url: string;

  constructor(private httpClient: HttpClient) {
    this.url = environment.api_receta_url + '/rec';
  }
  public upload(formData) {

    return this.httpClient.post<any>(this.url + 'file', formData, {
      reportProgress: true,
      observe: 'events'
    });
  }
}
