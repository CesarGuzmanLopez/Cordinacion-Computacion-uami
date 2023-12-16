// http-back.service.ts
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HttpBack {
  private authToken: string | null = null;

  constructor(private http: HttpClient) {}

  private url = environment.backUrl;
  private urlToken = environment.backUrl + '/sanctum/csrf-cookie';

  // Actualiza el token de autenticación
  public updateAuthToken(token: string | null): void {
    this.authToken = token;
  }

  // Genera las opciones HTTP, incluyendo el token de autorización si está disponible
  private getHttpOptions() {
    let headers = new HttpHeaders({});

    if (this.authToken) {
      headers = headers.append('Authorization', `Bearer ${this.authToken}`);
    }

    return {
      headers: headers,
      withCredentials: true, // Añadir withCredentials a las opciones
    };
  }

  // Obtiene el token CSRF y luego ejecuta la solicitud HTTP
  private async fetchCsrfToken(): Promise<void> {
    await lastValueFrom(this.http.get(this.urlToken, this.getHttpOptions()));
  }

  public async requestGET<T>(url: string): Promise<T> {
    await this.fetchCsrfToken();

    return lastValueFrom(
      this.http.get<T>(this.url + url, this.getHttpOptions()),
    );
  }

  public async requestPOST<T>(url: string, body: any): Promise<T> {
    await this.fetchCsrfToken();
    return lastValueFrom(
      this.http.post<T>(this.url + url, body, this.getHttpOptions()),
    );
  }
  public async requestPUT<T>(url: string, body: any): Promise<T> {
    await this.fetchCsrfToken();
    return lastValueFrom(
      this.http.put<T>(this.url + url, body, this.getHttpOptions()),
    );
  }
  public async requestDELETE<T>(url: string): Promise<T> {
    await this.fetchCsrfToken();
    return lastValueFrom(
      this.http.delete<T>(this.url + url, this.getHttpOptions()),
    );
  }

  public async requestPATCH<T>(url: string, body: any): Promise<T> {
    await this.fetchCsrfToken();
    return lastValueFrom(
      this.http.patch<T>(this.url + url, body, this.getHttpOptions()),
    );
  }
}
