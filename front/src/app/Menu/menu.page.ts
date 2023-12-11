import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppSessionService } from '../shared/services/session/app-session-local.service';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage {
  logout() {
    this.session.closeAppSession();
  }
  navigateTo(arg0: string) {
    this.router.navigate([arg0]);
  }
  constructor(
    private router: Router,
    private session: AppSessionService,
  ) {}
}
