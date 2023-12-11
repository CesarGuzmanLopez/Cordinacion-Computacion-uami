import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  go(arg0: string) {
    this.router.navigate([arg0]);
  }
  async openModalCamera() {}
  constructor(private router: Router) {
    this.requestPermission();
  }
  async clickToRedirect(url: string) {
    //redirigir a la página de información general
    this.router.navigate([url]);
  }
  requestPermission() {}
}
