import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Preferences } from '@capacitor/preferences';
import { BehaviorSubject, Observable } from 'rxjs';
import { AppSession, Rol } from 'src/app/shared/Interfaces/app-session';
import { HttpBack } from '../http/http.service';
import { SessionResponse } from './contracts/login';

@Injectable({
  providedIn: 'root',
})
export class AppSessionService {
  private url = '/login';
  private appSession?: AppSession;

  private isAuthSubject = new BehaviorSubject<boolean>(false); // BehaviorSubject para reactividad
  public isAuth: Observable<boolean> = this.isAuthSubject.asObservable();

  constructor(
    private router: Router,
    private http: HttpBack,
  ) {
    this.loadAppSessionFromPreferences();
  }

  private updateAuthStatus(): void {
    this.isAuthSubject.next(!!this.appSession?.token);
  }

  public async isAuthenticated(): Promise<boolean> {
    await this.loadAppSessionFromPreferences();
    return this.appSession?.rol !== Rol.Invitado && !!this.appSession?.token;
  }

  public async login(email: string, password: string): Promise<boolean> {
    try {
      const next = await this.http.requestPOST<SessionResponse>(this.url, {
        email: email,
        password: password,
      });

      this.appSession = {
        rol: next.rol,
        token: next.token,
        sessionState: this.isAuth,
        sessionStartTimestamp: new Date(),
        sessionEndTimestamp: null,
        lastActionTimestamp: new Date(),
      };

      await Preferences.set({
        key: 'appSession',
        value: JSON.stringify(this.appSession),
      });
      this.http.updateAuthToken(this.appSession.token ?? '');
      this.updateAuthStatus(); // Actualiza el estado de autenticación
      return true;
    } catch (error) {
      console.error('Error en el inicio de sesión:', error);
      return false;
    }
  }

  public async closeAppSession() {
    try {
      await Promise.all([
        Preferences.remove({ key: 'appSession' }),
        Preferences.remove({ key: 'tokenFirebase' }),
      ]);
      this.appSession = undefined;
      this.http.updateAuthToken(null);
      this.http.requestGET('/logout');
      this.updateAuthStatus(); // Actualiza el estado de autenticación
      window.location.href = '/';
    } catch (error) {
      throw new Error('No se pudo cerrar la sesión: ' + error);
    }
  }

  public async setTokenFirebase(token: string) {
    return Preferences.set({
      key: 'tokenFirebase',
      value: token,
    });
  }

  public async ResetPassword(email: string, birthday: string) {
    // Implementación pendiente
  }

  private async loadAppSessionFromPreferences() {
    await Preferences.get({ key: 'appSession' }).then(async (result) => {
      if (result.value) {
        this.appSession = JSON.parse(result.value);
        this.http.updateAuthToken(this.appSession?.token ?? '');
        this.updateAuthStatus(); // Actualiza el estado de autenticación
      } else {
        this.appSession = await this.http.requestGET<AppSession>('/login');
        this.http.updateAuthToken(this.appSession?.token ?? '');
      }
    });
  }
}
