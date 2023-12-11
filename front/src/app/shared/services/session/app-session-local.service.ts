import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Preferences } from '@capacitor/preferences';
import { Observable, lastValueFrom, of } from 'rxjs';
import { AppSession, Rol } from 'src/app/shared/Interfaces/app-session';
import { environment } from 'src/environments/environment';
import { SessionResponse } from './contracts/login';
@Injectable({
  providedIn: 'root',
})
export class AppSessionService {
  private url = environment.backUrl + '/login';
  private urlToken = environment.backUrl + '/sanctum/csrf-cookie';
  private appSession?: AppSession;

  constructor(
    private router: Router,
    private http: HttpClient,
  ) {
    this.loadAppSessionFromPreferences();
  }

  private isAuth: Observable<boolean> = of(!!this.appSession?.token);
  private noIsAuth: Observable<boolean> = of(!this.appSession?.token);

  public async getSessionhttp() {
    const respones$ = lastValueFrom(
      this.http.get<SessionResponse>(this.url + '/'),
    );
    const responesToken$ = lastValueFrom(this.http.get<string>(this.urlToken));
    let tokenCSRF: string = '';
    await responesToken$.then((next) => {
      tokenCSRF = next;
    });
    await respones$.then((next) => {
      this.appSession = {
        token: tokenCSRF,
        rol: next.rol,
        sessionState: this.isAuth,
        sessionStartTimestamp: new Date(),
        sessionEndTimestamp: null,
        lastActionTimestamp: new Date(),
      };

      Preferences.set({
        key: 'appSession',
        value: JSON.stringify(this.appSession),
      });
      Promise.resolve(true);
    });
  }
  public async isAuthenticated(): Promise<boolean> {
    let haySession: boolean = !!this.appSession?.token;
    await this.loadAppSessionFromPreferences()
      .then(() => {
        haySession =
          !!this.appSession?.token && this.appSession?.rol !== Rol.Invitado;
        console.log('token', this.appSession?.token);
      })
      .catch((error) => {
        console.log(error);
        haySession = false;
      });
    return haySession;
  }
  /**
   * Perform user login.
   * @param email - User's email
   * @param password - User's password
   * @returns Promise<boolean> - Indicates if the login was successful.
   */
  public async login(email: string, password: string): Promise<boolean> {
    //envio con el token csrf que esta guardadi en la session
    const responesToken$ = lastValueFrom(this.http.get<string>(this.urlToken));
    let tokenCSRF: string = '';
    await responesToken$.then((next) => {
      tokenCSRF = next;
    });
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-csrf-token': tokenCSRF,
    });
    let body = { email: email, password: password };
    console.log(body);

    let respones$ = lastValueFrom(
      this.http.post<SessionResponse>(this.url + '/', body, {
        headers: headers,
      }),
    );
    await respones$.then(
      (next) => {
        this.appSession = {
          token: tokenCSRF,
          rol: next.rol,
          sessionState: this.isAuth,
          sessionStartTimestamp: new Date(),
          sessionEndTimestamp: null,
          lastActionTimestamp: new Date(),
        };
        Preferences.set({
          key: 'appSession',
          value: JSON.stringify(this.appSession),
        });
        Promise.resolve(true);
      },
      (error) => {
        console.log(error);
        Promise.reject(new Error('No se pudo iniciar sesión'));
      },
    );
    return true;
  }

  public async closeAppSession() {
    let salid1 = Preferences.remove({ key: 'appSession' });
    let aslid2 = Preferences.remove({ key: 'tokenFirebase' });
    await Promise.all([salid1, aslid2])
      .then(() => {
        window.location.href = '/';
      })
      .catch((error) => {
        throw new Error('No se pudo cerrar la sesión' + error);
      });
  }

  public async setTokenFirebase(token: string) {
    return Preferences.set({
      key: 'tokenFirebase',
      value: token,
    });
  }
  public async ResetPassword(email: string, birthday: string) {}
  // Función para cargar la sesión desde Capacitor Preferences.
  private async loadAppSessionFromPreferences() {
    await this.getSessionhttp();
    await Preferences.get({ key: 'appSession' }).then((result) => {
      if (result.value) {
        this.appSession = JSON.parse(result.value);
      }
    });
  }
}
