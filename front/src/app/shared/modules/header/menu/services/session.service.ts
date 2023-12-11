import { Injectable } from '@angular/core';
import { AppSessionService } from 'src/app/shared/services/session/app-session-local.service';
@Injectable({
  providedIn: 'root',
})
export class SessionMenuService {
  constructor(private session: AppSessionService) {}
  public closeSession() {
    this.session.closeAppSession();
  }
}
