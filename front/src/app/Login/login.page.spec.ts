import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginPage } from './login.page';
describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;
  beforeEach(() => {
    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  describe('isError()', () => {
    it('el campo deberia de marcar correcto si esta bien formado el correo', () => {
      component.loginForm.get('email')?.setValue('teste@xample.com');
      component.loginForm.get('email')?.markAsTouched();
      const isError = component.isError('email');
      expect(isError).toBe(false);
    });
    it('el campo debe marcar error si esta mal formateado el correo', () => {
      component.loginForm.get('email')?.setValue('testexample');
      component.loginForm.get('email')?.markAsTouched();
      const isError = component.isError('email');
      expect(isError).toBe(true);
    });
  });
  describe('getMessageError()', () => {
    it('should return the error message for the specified field', () => {
      component.loginForm.get('email')?.setErrors({ required: true });
      const errorMessage = component.getMessageError('email');
      expect(errorMessage).toBe('Campo obligatorio');
    });
    it('should return an empty string if the field is not an error', () => {
      component.loginForm.get('email')?.setValue('test@example.com');
      const errorMessage = component.getMessageError('email');
      expect(errorMessage).toBe('');
    });
  });
});
