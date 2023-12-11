import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { FormsInputErrorsComponent } from './forms-input/formsImputsError.component';
@NgModule({
  declarations: [FormsInputErrorsComponent],
  imports: [FormsModule, CommonModule, IonicModule],
  exports: [FormsInputErrorsComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ErrorsViewsModule {}
