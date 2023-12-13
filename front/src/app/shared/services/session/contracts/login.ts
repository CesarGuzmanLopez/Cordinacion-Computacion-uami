import { Rol } from 'src/app/shared/Interfaces/app-session';

export interface LoginSend {
  email: string;
  password: string;
}

export interface SessionResponse {
  status: string;
  token: string;
  rol: Rol;
}
