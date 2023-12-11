import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Preferences } from '@capacitor/preferences';
import { Observable, of } from 'rxjs';
import { AppSession } from 'src/app/shared/Interfaces/app-session';
import { SleepUtils } from 'src/app/shared/functions/sleep-utils';
import { SessionUserNoAuthorizedException } from './app-session.exception';
@Injectable({
  providedIn: 'root',
})
export class AppSessionService {
  private appSession?: AppSession;
  constructor(private router: Router) {
    this.loadAppSessionFromPreferences();
  }
  private isAuth: Observable<boolean> = of(!!this.appSession?.token);
  private noIsAuth: Observable<boolean> = of(!this.appSession?.token);
  //declaro variables para pruebas en lo que se implementan los
  // test end to end
  // datos correctos
  private email: string = 'admin@admin.com';
  private password: string = 'admin123';
  private token: string = 'da2ac8b0-6b1a-4c7e-8a7a-0d9a2a2c7a8a';
  private sessionState: string = '';
  private nombre: string = 'cesar';
  private primer_apellido: string = 'Guzman';
  private segundo_apellido: string = 'Lopez';
  private fecha_nacimiento: string = '1990-01-01';
  //datos  de usuario no permitido a registrarse
  private nombre_no_permitido: string = 'cesar';
  private primer_apellido_no_permitido: string = 'Gonzalez';
  private segundo_apellido_no_permitido: string = 'Lopez';
  private fecha_nacimiento_no_permitido: string = '1990-01-01';
  //email de usuario no permitido a registrarse
  private email_no_permitido: string = 'no@no.com';
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
    // Simulate a login request
    let salida: boolean = await SleepUtils.timeout(200);
    if (salida && email === this.email && password === this.password) {
      token = this.token;
    }
    if (token === '') {
      return Promise.reject(new Error('Contraseña o correo incorrectos'));
    }
    this.appSession = {
      token: this.token,
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
    let salida: boolean = await SleepUtils.timeout(4000);
    if (salida && email == this.email_no_permitido) {
      throw new SessionUserNoAuthorizedException();
    }
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
