import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SharedModules } from '../shared/shared-modules.module';
import { RegistroPageRoutingModule } from './registro-routing.module';
import { RegistroPage } from './registro.page';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistroPageRoutingModule,
    SharedModules,
    ReactiveFormsModule,
  ],
  declarations: [RegistroPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class RegistroPageModule {}
