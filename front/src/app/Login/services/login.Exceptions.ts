export class LoginBadEntryError extends Error {
  constructor(error: Error | string) {
    if (error instanceof Error) {
      error = error.message;
    }
    super('Error en los datos de entrada ' + (error ?? ''));
    this.name = 'Error de entrada';
  }
}
