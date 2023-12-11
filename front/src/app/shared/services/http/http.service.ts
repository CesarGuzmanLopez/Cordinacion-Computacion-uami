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

  public requestGET<T>(url: string): Promise<T> {
    const respones$ = lastValueFrom(this.http.get<T>(this.url + url));
    return respones$;
  }
  public requestPOST<T>(url: string, body: any): Promise<T> {
    this.http.get(this.urlToken);
    //obtengo el token
    lastValueFrom(this.http.get(this.urlToken));
    return lastValueFrom(this.http.post<T>(this.url + url, body));
  }
}
