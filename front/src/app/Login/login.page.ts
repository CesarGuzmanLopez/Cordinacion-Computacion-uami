import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { LoginBadEntryError } from './services/login.Exceptions';
import { LoginService } from './services/login.service';
/**
 *
 * The LoginPage class represents the application's login page.
 * It provides the functionality to validate the login form, manage errors,
 * and perform user authentication.
 * The page contains a login form with email and password fields.
 * The fields are validated in real-time,
 * and appropriate error messages are displayed.
 * The page also handles the logic for credential verification and user login. If errors occur during the process, an alert is displayed to the user.
 * @var loginForm - The login form.
 * @var waiting - Indicates if the login process is in progress.
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  go(arg0: string) {
    this.router.navigate([arg0]);
  }
  loginForm!: FormGroup;
  get waiting(): boolean {
    return this._waiting;
  }
  set waiting(wait: boolean) {
    if (wait) {
      this.loginForm.disable();
    } else {
      this.loginForm.enable();
    }
    this._waiting = wait;
  }
  constructor(
    private alertController: AlertController,
    private loginService: LoginService,
    private router: Router,
  ) {}
  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl({ value: '', disabled: this.waiting }, [
        Validators.required,
        Validators.email,
        Validators.pattern(
          /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        ),
        Validators.minLength(3),
      ]),
      password: new FormControl({ value: '', disabled: this.waiting }, [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }
  /**
   * Función que se ejecuta cuando se envía el formulario.
   */
  async onSubmit() {
    this.waiting = true;
    this.loginForm.markAllAsTouched();
    if (this.verifyAllFields()) {
      throw new LoginBadEntryError(this.getFirstInvalidControl());
    }
    await this.verifyAndLogin()
      .then(() => {
        this.waiting = false;
      })
      .catch((error) => {
        this.showAlert(error);
      })
      .finally(() => {
        this.waiting = false;
      });
  }
  /**
   * Comprueba si un campo del formulario tiene un error.
   * @param name - Nombre del campo a comprobar.
   * @returns Verdadero si el campo es un error, falso en caso contrario.
   */
  isError(name: string): boolean {
    return (
      (this.loginForm.get(name)?.touched &&
        this.loginForm.get(name)?.invalid) ??
      false
    );
  }
  /**
   * Obtiene el mensaje de error para un campo del formulario.
   * @param name - Nombre del campo para el que se desea obtener el mensaje de error.
   * @returns El mensaje de error correspondiente al campo especificado.
   */
  getMessageError(name: string): string {
    const control = this.loginForm.get(name);
    if (!control) {
      console.error('No existe el control', name);
      return 'Error en el campo';
    }
    const errors = control.errors;
    if (errors?.['required']) {
      return 'Campo obligatorio';
    }
    if (errors?.['email'] || errors?.['pattern']) {
      return 'Email inválido';
    }
    if (errors?.['minlength']) {
      const requiredLength = errors?.['minlength'].requiredLength;
      return `Mínimo de ${requiredLength} caracteres`;
    }
    return '';
  }
  private verifyAllFields(): boolean {
    return (
      this.loginForm.invalid ||
      this.loginForm.get('email')?.value === '' ||
      this.loginForm.get('password')?.value === ''
    );
  }
  private _waiting: boolean = false;
  private getFirstInvalidControl(): string {
    const invalidControls = Object.keys(this.loginForm.controls).filter(
      (key) => this.loginForm.controls[key].invalid,
    );
    return invalidControls[0];
  }
  private async verifyAndLogin(): Promise<void> {
    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;
    await this.loginService
      .login(email, password)
      .then((values) => {
        this.loginForm.reset();
        //window.location.href = '/home';
      })
      .catch((error) => {
        return Promise.reject(new LoginBadEntryError(error));
      });
  }
  private async showAlert(message: string | Error) {
    let header = 'Error';
    if (message instanceof Error) {
      header = message.name;
      message = message.message;
    }
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK'],
      animated: true,
    });
    await alert.present();
  }
}
