import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SharedModules } from '../shared/shared-modules.module';
import { ResetPasswordPageRoutingModule } from './reset-password-routing.module';
import { ResetPasswordPage } from './reset-password.page';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ResetPasswordPageRoutingModule,
    SharedModules,
    ReactiveFormsModule,
    FormsModule,
  ],
  declarations: [ResetPasswordPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ResetPasswordPageModule {}
