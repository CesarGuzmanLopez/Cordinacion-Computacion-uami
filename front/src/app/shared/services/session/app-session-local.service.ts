import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Preferences } from '@capacitor/preferences';
import { Observable, of } from 'rxjs';
import { AppSession } from 'src/app/shared/Interfaces/app-session';
import { SleepUtils } from 'src/app/shared/functions/sleep-utils';
import { environment } from 'src/environments/environment';
import { SessionUserNoAuthorizedException } from './app-session.exception';
@Injectable({
  providedIn: 'root',
})
export class AppSessionService {
  private url = environment.backUrl + '/webApps';
  private appSession?: AppSession;
  constructor(private router: Router) {
    this.loadAppSessionFromPreferences();
  }
  private isAuth: Observable<boolean> = of(!!this.appSession?.token);
  private noIsAuth: Observable<boolean> = of(!this.appSession?.token);

  public async isAuthenticated(): Promise<boolean> {
    let haySession: boolean = !!this.appSession?.token;
    await this.loadAppSessionFromPreferences()
      .then(() => {
        haySession = !!this.appSession?.token;
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
    if (this.appSession?.token) {
      return Promise.reject(new Error('A session is already active'));
    }
    let token: string = '';

    if (token === '') {
      return Promise.reject(new Error('Contraseña o correo incorrectos'));
    }
    this.appSession = {
      token: '' ,
      sessionState: this.isAuth,
      sessionStartTimestamp: new Date(),
      sessionEndTimestamp: null,
      lastActionTimestamp: new Date(),
    };
    try {
      await Preferences.set({
        key: 'appSession',
        value: JSON.stringify(this.appSession),
      });
      return Promise.resolve(true);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public async closeAppSession() {
    console.log('closeAppSession');
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
  public async ResetPassword(email: string, birthday: string) {

  }
  // Función para cargar la sesión desde Capacitor Preferences.
  private async loadAppSessionFromPreferences() {
    await Preferences.get({ key: 'appSession' }).then((result) => {
      if (result.value) {
        this.appSession = JSON.parse(result.value);
      }
    });
  }
}
