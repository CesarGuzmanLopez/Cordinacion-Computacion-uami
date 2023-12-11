export class SessionUserNoAuthorizedException extends Error {
  constructor() {
    super(
      'Usuario no autorizado, si cree que esto es un error, contacte la universidad.',
    );
    this.name = 'Usuario no autorizado';
  }
}
