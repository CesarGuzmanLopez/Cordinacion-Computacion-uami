import { Injectable } from '@angular/core';
import { AppSessionService } from 'src/app/shared/services/session/app-session-local.service';
@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private appSession: AppSessionService) {}
  /**
   * The `login` function logs in the user with the provided credentials.
   * @param email Email to log in.
   * @param password Password to log in.
   * @returns A promise that resolves to `true` if the login was successful or `false` if it was not.
   * @throws An error if the provided credentials are invalid.
   */
  public async login(email: string, password: string): Promise<boolean> {
    return this.appSession.login(email, password);
  }
}
