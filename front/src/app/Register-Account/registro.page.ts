import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { RegistroInputDataException } from './services/registro.Error';
import { RegistroService } from './services/registro.service';
@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  registerForm!: FormGroup;
  private _DataOfNewUser!: any;
  private _waiting: boolean = false;
  set waiting(wait: boolean) {
    if (wait) {
      this.registerForm.disable();
    } else {
      this.registerForm.enable();
    }
    this._waiting = wait;
  }
  get waiting(): boolean {
    return this._waiting;
  }
  constructor(
    private alertController: AlertController,
    private router: Router,
    private registroService: RegistroService,
  ) {}
  ngOnInit() {
    this.registerForm = new FormGroup({
      name: new FormControl({ value: '', disabled: this.waiting }, [
        Validators.required,
        Validators.pattern('[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ]{2,20}'),
        Validators.minLength(3),
      ]),
      firstLastName: new FormControl({ value: '', disabled: this.waiting }, [
        Validators.required,
        Validators.pattern('[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ]{2,20}'),
        Validators.minLength(3),
      ]),
      secondLastName: new FormControl({ value: '', disabled: this.waiting }, [
        Validators.required,
        Validators.pattern('[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ]{2,20}'),
        Validators.minLength(3),
      ]),
      birthday: new FormControl({ value: '', disabled: this.waiting }, [
        Validators.required,
        Validators.minLength(6),
      ]),
      email: new FormControl({ value: '', disabled: this.waiting }, [
        Validators.required,
        Validators.email,
        //Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}'),
        Validators.pattern(
          /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        ),
        Validators.minLength(3),
      ]),
      password: new FormControl({ value: '', disabled: this.waiting }, [
        Validators.required,
        Validators.minLength(8),
      ]),
    });
  }
  /**
   * this function is called when the user click on the button submit
   */
  async onSubmit() {
    this.newUserGenerated();
    this.waiting = true;
    this.registerForm.markAllAsTouched();
    try {
      if (!this.verifyAllForm()) {
        throw new RegistroInputDataException(this.getFirstInvalidControl());
      }
    } catch (error: any) {
      await this.showAlert(error);
    } finally {
      this.waiting = false;
    }
  }
  /**
   * this function verify if the field is invalid and touched
   * @param name : nombre del campo a verificar
   * @returns
   */
  isError(name: string): boolean | undefined {
    return (
      this.registerForm.get(name)?.invalid &&
      this.registerForm.get(name)?.touched
    );
  }
  /**
   * this function verify if all fields are valid and touched
   * @returns true if all fields are valid and touched
   */
  verifyAllForm(): boolean {
    let nombre = this.registerForm.get('name')?.value;
    let primer_apellido = this.registerForm.get('firstLastName')?.value;
    let segundo_apellido = this.registerForm.get('secondLastName')?.value;
    let fecha_nacimiento = this.registerForm.get('birthday')?.value;
    let correo = this.registerForm.get('email')?.value;
    let password = this.registerForm.get('password')?.value;
    if (
      nombre === '' ||
      primer_apellido === '' ||
      segundo_apellido === '' ||
      fecha_nacimiento === '' ||
      correo === '' ||
      password === ''
    ) {
      return false;
    }
    return !this.registerForm.invalid;
  }
  /**
   *  this function return the error message of the field
   * @param name : nombre del campo a verificar
   */
  getErrorMessage(name: string): string {
    if (this.registerForm.get(name)?.errors?.['required']) {
      return 'Campo obligatorio';
    }
    if (this.registerForm.get(name)?.errors?.['email']) {
      return 'Email inválido';
    }
    if (this.registerForm.get(name)?.errors?.['minlength']) {
      return `Mínimo de ${this.registerForm.get(name)?.errors?.['minlength']
        .requiredLength} caracteres`;
    }
    if (this.registerForm.get(name)?.errors?.['pattern']) {
      return 'Formato de campo inválido';
    }
    return '';
  }
  private async sendRegister() {}
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
  private getFirstInvalidControl(): string {
    const invalidControls = Object.keys(this.registerForm.controls).filter(
      (key) => this.registerForm.controls[key].invalid,
    );
    return invalidControls[0];
  }
  private newUserGenerated() {
    this._DataOfNewUser = {
      nombre: this.registerForm.get('name')?.value,
      primer_apellido: this.registerForm.get('firstLastName')?.value,
      segundo_apellido: this.registerForm.get('secondLastName')?.value,
      fecha_nacimiento: this.registerForm.get('birthday')?.value,
      correo: this.registerForm.get('email')?.value,
      password: this.registerForm.get('password')?.value,
    };
  }
}
