import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Preferences } from '@capacitor/preferences';
import { Observable, of } from 'rxjs';
import { AppSession, Rol } from 'src/app/shared/Interfaces/app-session';
import { HttpBack } from '../http/http.service';
import { SessionResponse } from './contracts/login';
@Injectable({
  providedIn: 'root',
})
export class AppSessionService {
  private url = '/login';
  private appSession?: AppSession;

  constructor(
    private router: Router,
    private http: HttpBack,
  ) {
    this.loadAppSessionFromPreferences();
  }

  private isAuth: Observable<boolean> = of(!!this.appSession?.token);
  private noIsAuth: Observable<boolean> = of(!this.appSession?.token);

  public async getSessionhttp() {
    const respones$ = this.http.requestGET<SessionResponse>(this.url);
    await respones$.then((session) => {
      this.appSession = {
        rol: session.rol,
        token: session.token,
        sessionState: this.isAuth,
        sessionStartTimestamp: new Date(),
        sessionEndTimestamp: null,
        lastActionTimestamp: new Date(),
      };
      console.log(this.appSession);
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
        haySession = this.appSession?.rol !== Rol.Invitado;
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
    await this.http
      .requestPOST<SessionResponse>(this.url, {
        email: email,
        password: password,
      })
      .then((next) => {
        this.appSession = {
          rol: next.rol,
          token: next.token,
          sessionState: this.isAuth,
          sessionStartTimestamp: new Date(),
          sessionEndTimestamp: null,
          lastActionTimestamp: new Date(),
        };

        Preferences.set({
          key: 'appSession',
          value: JSON.stringify(this.appSession),
        });
        console.log(this.appSession);
      });
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
