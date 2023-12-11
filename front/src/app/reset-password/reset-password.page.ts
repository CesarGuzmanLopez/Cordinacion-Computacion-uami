import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ResetPasswordService } from './services/reset-password.service';
import { ResetEmailException } from './services/reset-pasword.Exceptions';
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
/**
 *
 * The ResetPasswordPage class represents the application's reset login page.
 * It provides the functionality to validate the reset form, manage errors,
 * The page contains a login form with email and password fields.
 * and appropriate error messages are displayed.
 * The page also handles the logic for credential verification and user login. If errors occur during the process, an alert is displayed to the user.
 * @var loginForm - The login form.
 */
export class ResetPasswordPage implements OnInit {
  recoveryForm!: FormGroup;
  set waiting(wait: boolean) {
    if (wait) {
      this.recoveryForm.disable();
    } else {
      this.recoveryForm.enable();
    }
    this._waiting = wait;
  }
  get waiting(): boolean {
    return this._waiting;
  }
  constructor(
    private formBuilder: FormBuilder,
    private alertController: AlertController,
    private resetPasswordService: ResetPasswordService,
    private router: Router,
  ) {}
  ngOnInit() {
    this.recoveryForm = new FormGroup({
      email: new FormControl({ value: '', disabled: this.waiting }, [
        Validators.required,
        Validators.email,
        Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}'),
        Validators.minLength(3),
      ]),
      birthday: new FormControl({ value: '', disabled: this.waiting }, [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }
  isError(name: string): boolean | undefined {
    return (
      this.recoveryForm.get(name)?.touched &&
      this.recoveryForm.get(name)?.invalid
    );
  }
  getMessageError(name: string): string {
    if (this.recoveryForm.get(name)?.errors?.['required']) {
      return 'Campo obligatorio';
    }
    if (
      this.recoveryForm.get(name)?.errors?.['email'] ||
      this.recoveryForm.get(name)?.errors?.['pattern']
    ) {
      return 'Email inválido';
    }
    if (this.recoveryForm.get(name)?.errors?.['minlength']) {
      return `Mínimo de ${this.recoveryForm.get(name)?.errors?.['minlength']
        .requiredLength} caracteres`;
    }
    return '';
  }
  async onSubmit() {
    this.waiting = true;
    this.recoveryForm.markAllAsTouched();
    try {
      if (this.recoveryForm.invalid) {
        throw new ResetEmailException();
      }
      await this.verifyAndSendReset().then(() => {
        this.router.navigate(['/']);
      });
    } catch (error: any) {
      await this.showAlert(error);
    } finally {
      this.waiting = false;
    }
  }
  private _waiting: boolean = false;
  private async verifyAndSendReset() {
    const email = this.recoveryForm.value.email;
    const birthday = this.recoveryForm.value.birthday;
    await this.resetPasswordService
      .sendResetRequest(email, birthday)
      .then(async () => {
        await this.showAlert(
          'Si la información es correcta, recibirá un correo electrónico con las instrucciones para restablecer su contraseña.',
          'Correo electrónico enviado',
        );
        this.recoveryForm.reset();
      });
  }
  private async showAlert(message: string | Error, header: string = 'Error') {
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
    await alert.onDidDismiss();
  }
}
