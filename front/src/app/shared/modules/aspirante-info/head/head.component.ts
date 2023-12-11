import { Component } from '@angular/core';
import { Directory, Filesystem } from '@capacitor/filesystem';
import { Aspirante } from 'src/app/shared/Interfaces/aspirante';
import { AspiranteService } from 'src/app/shared/services/Aspirante/aspirante.service';
@Component({
  selector: 'head-info-user',
  templateUrl: './head.component.html',
  styleUrls: ['./head.component.scss'],
})
export class HeadComponentInfoUser {
  aspirante!: Aspirante;
  urlImage!: string;
  constructor(private aspiranteService: AspiranteService) {
    this.aspiranteService.aspirante.then((aspirante) => {
      this.aspirante = aspirante;
      this.loadAspirante();
    });
  }
  async loadAspirante() {
    try {
      if (this.aspirante.fotografia) {
        await Filesystem.readFile({
          path: this.aspirante.fotografia.path_fotografia,
          directory: Directory.Data,
        }).then((data) => {
          this.urlImage = `data:image/jpeg;base64,${data.data}`;
        });
      }
    } catch (error) {
      console.error('Error al cargar el aspirante:', error);
    }
  }
}
