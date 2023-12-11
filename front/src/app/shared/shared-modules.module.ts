import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ErrorsViewsModule } from './modules/errors-views/errors.module';
import { AppFormsModule } from './modules/forms/forms.module';
import { HeaderModule } from './modules/header/header.module';
import { SpinnersModule } from './modules/spinners/Spinners.module';
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HeaderModule,
    SpinnersModule,
    AppFormsModule,
    ErrorsViewsModule,
  ],
  exports: [HeaderModule, SpinnersModule, AppFormsModule, ErrorsViewsModule],
})
export class SharedModules {}
