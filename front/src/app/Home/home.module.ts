import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AppFormsModule } from 'src/app/shared/modules/forms/forms.module';
import { SharedModules } from 'src/app/shared/shared-modules.module';
import { HomePageRoutingModule } from './home-routing.module';
import { HomePage } from './home.page';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    SharedModules,
    AppFormsModule,
    ReactiveFormsModule,
  ],
  declarations: [HomePage],

  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HomePageModule {}
