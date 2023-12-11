import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { FormsInputErrorsComponent } from './formsImputsError.component';
describe('FormsComponent', () => {
  let component: FormsInputErrorsComponent;
  let fixture: ComponentFixture<FormsInputErrorsComponent>;
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [FormsInputErrorsComponent],
      imports: [IonicModule.forRoot()],
    }).compileComponents();
    fixture = TestBed.createComponent(FormsInputErrorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
