import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AppSessionService } from '../shared/services/session/app-session-local.service';
import { HomePage } from './home.page';
describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;
  beforeEach(waitForAsync(() => {
    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));
  /**
 *   private email: string = 'admin@admin.com';
  private password: string = 'admin123';
 **/
  it('should create', () => {
    let approuter: Router = new Router();
    let appsession: AppSessionService = new AppSessionService(approuter);
    appsession.login('admin@admin.com', 'admin123');
    expect(component).toBeTruthy();
  });
});
