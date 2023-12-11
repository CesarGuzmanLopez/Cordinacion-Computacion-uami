import { Observable } from 'rxjs';
//"Alumno", "Profesor", "Cordinador","Sistema","Postulante" ,"Administrador", "Invitado"
export enum Rol {
  Alumno = 'Alumno',
  Profesor = 'Profesor',
  Cordinador = 'Cordinador',
  Sistema = 'Sistema',
  Postulante = 'Postulante',
  Administrador = 'Administrador',
  Invitado = 'Invitado',
}
export interface AppSession {
  id_usuario?: string;
  token?: string;
  rol: Rol;
  sessionState: Observable<boolean>;
  sessionStartTimestamp?: Date | null;
  sessionEndTimestamp?: Date | null;
  lastActionTimestamp?: Date | null;
}
