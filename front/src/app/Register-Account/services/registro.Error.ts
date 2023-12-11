export class RegistroInputDataException extends Error {
  constructor(error: Error | string) {
    if (error instanceof Error) {
      error = error.message;
    }
    super('Error en los datos de entrada ' + error);
    this.name = 'Error de entrada';
  }
}
export class RegistroNoProcesadoException extends Error {
  constructor(error: Error | string) {
    if (error instanceof Error) {
      error = error.message;
    }
    super('Error en el registro ' + error);
    this.name = 'Error de registro';
  }
}
