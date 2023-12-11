import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class BackgroundService {
  async setDarkMode() {
    document.body.style.setProperty(
      'background-color',
      'var(--ion-background-color-dark)',
    );
    document.body.style.setProperty(
      'background-image',
      'var(--ion-background-url-dark)',
    );
    this.setProportions();
  }
  async setNormalMode() {
    // Set normal mode background color and image
    document.body.style.setProperty(
      'background-color',
      'var(--ion-background-color)',
    );
    document.body.style.setProperty(
      'background-image',
      'var(--ion-background-url)',
    );
    this.setProportions();
  }
  private setProportions(): void {
    document.body.style.setProperty('background-repeat', 'no-repeat');
    document.body.style.setProperty('background-size', '100% auto');
    document.body.style.setProperty('background-position', 'top center');
    document.body.style.setProperty('background-attachment', 'fixed');
    document.body.style.setProperty('background-origin', 'border-box');
  }
}
