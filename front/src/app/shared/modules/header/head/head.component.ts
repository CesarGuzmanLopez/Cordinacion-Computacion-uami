import { Component, Input, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { BackgroundService } from 'src/app/shared/services/background.service';
@Component({
  selector: 'app-head',
  templateUrl: './head.component.html',
  styleUrls: ['./head.component-all.scss'],
})
export class HeadComponent implements OnInit {
  @Input() public title = '';
  @Input() public dark: boolean = false;
  public imagen: string = '';
  constructor(
    private backgroundService: BackgroundService,
    private titleService: Title,
  ) {
    window.addEventListener('popstate', () => {
      window.location.reload();
    });
  }
  async ngOnInit() {
    this.titleService.setTitle(this.title);
    if (this.dark) {
      this.backgroundService.setDarkMode().then(() => {
        this.imagen = '/assets/Logo-Grande-Blanco.svg';
      });
    } else {
      this.backgroundService.setNormalMode().then(() => {
        this.imagen = '/assets/Logo-Grande-Negro.svg';
      });
    }
  }
}
