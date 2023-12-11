import { Observable } from 'rxjs';
export interface AppSession {
  token?: string;
  id_usuario?: string;
  sessionState: Observable<boolean>;
  sessionStartTimestamp?: Date | null;
  sessionEndTimestamp?: Date | null;
  lastActionTimestamp?: Date | null;
}
