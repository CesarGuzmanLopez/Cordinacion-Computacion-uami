import { Component, Input } from '@angular/core';
@Component({
  selector: 'app-input-error',
  templateUrl: './formsImputsError.component.html',
  styleUrls: ['./formsImputsError.component.scss'],
})
export class FormsInputErrorsComponent {
  @Input() public messageError?: string = '';
}
