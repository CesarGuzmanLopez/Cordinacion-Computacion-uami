import { TestBed } from '@angular/core/testing';
import { AppSessionService } from './app-session-local.service';
describe('AppSessionLocalService', () => {
  let service: AppSessionService;
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppSessionService);
  });
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
