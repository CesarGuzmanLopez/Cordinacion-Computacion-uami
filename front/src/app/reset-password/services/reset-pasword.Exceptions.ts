export class ResetCredentialsException extends Error {
  constructor() {
    super('Credenciales inválidas');
    this.name = this.constructor.name;
  }
}
export class ResetEntryException extends Error {
  constructor(error: Error | string) {
    if (error instanceof Error) {
      error = error.message;
    }
    super('Error en los datos de entrada ' + error);
    this.name = 'Error de entrada';
  }
}
export class ResetEmailException extends Error {
  constructor() {
    super('Email inválido');
    this.name = this.constructor.name;
  }
}
export class ResetBirthdayException extends Error {
  constructor() {
    super('Fecha de nacimiento inválida');
    this.name = this.constructor.name;
  }
}
