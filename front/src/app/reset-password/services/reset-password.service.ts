import { Injectable } from '@angular/core';
import { AppSessionService } from '../../shared/services/session/app-session-local.service';
@Injectable({
  providedIn: 'root',
})
/**
 * The ResetPasswordService class provides the functionality to validate the reset form, manage errors,
 * and appropriate error messages are displayed.
 * The page also handles the logic for credential verification and user login. If errors occur during the process, an alert is displayed to the user.
 * @arg valid - The AppValidators class.
 * @arg appSessionService - The AppSessionService class.
 */
export class ResetPasswordService {
  constructor(private appSessionService: AppSessionService) {}
  /**
   * send reset request for reset password
   * @param email
   * @param birthday
   * @returns
   */
  public async sendResetRequest(email: string, birthday: string) {
    return this.appSessionService.ResetPassword(email, birthday);
  }
}
