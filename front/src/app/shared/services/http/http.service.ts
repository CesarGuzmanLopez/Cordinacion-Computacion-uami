import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class HttpBack {
  constructor(private http: HttpClient) {}
  //variables de entorno
  private url = environment.backUrl;
  private urlToken = environment.backUrl + '/sanctum/csrf-cookie';
  public TimeOut: number = 60000;
  public async requestGET<T>(url: string): Promise<T> {
    let regreso!: Promise<T>;
    this.http.get<T>(this.urlToken).subscribe(() => {
      regreso = lastValueFrom(this.http.get<T>(this.url + url));
    });
    let Time = this.TimeOut;
    while (regreso === undefined && Time > 0) {
      await new Promise((resolve) => setTimeout(resolve, 500));
      Time -= 500;
    }
    return regreso;
  }
  public async requestPOST<T>(url: string, body: any): Promise<T> {
    let regreso!: Promise<T>;
    let Time = this.TimeOut;
    this.http.get<T>(this.urlToken).subscribe(() => {
      regreso = lastValueFrom(this.http.post<T>(this.url + url, body));
    });
    while (regreso === undefined) {
      await new Promise((resolve) => setTimeout(resolve, 500));
      Time -= 500;
    }
    return regreso;
  }
}
