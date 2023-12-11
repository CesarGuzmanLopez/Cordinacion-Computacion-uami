import { Injectable } from '@angular/core';
import { AppSessionService } from 'src/app/shared/services/session/app-session-local.service';
@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private appSession: AppSessionService) {}
}
