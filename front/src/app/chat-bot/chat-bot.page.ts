import { Component } from '@angular/core';
import { LoadingController } from '@ionic/angular';
@Component({
  selector: 'app-chat-bot',
  templateUrl: './chat-bot.page.html',
  styleUrls: ['./chat-bot.page.scss'],
})
export class ChatBotPage {
  mensajes: { texto: string; esBot: boolean }[] = [];
  nuevoMensaje: string = '';
  opciones: { texto: string; respuesta: string }[] = [
    {
      texto: 'Cuando es la inscripcion de este trimestre',
      respuesta: 'La inscripción para este trimestre es en...',
    },
    {
      texto: 'Cual es el costo de la inscripcion',
      respuesta: 'El costo de la inscripción es...',
    },
    {
      texto: 'Cual la fecha límite de inscripción',
      respuesta: 'La fecha límite de inscripción es...',
    },
  ];
  constructor(private loadingController: LoadingController) {}
  async enviarMensaje() {
    this.mensajes.push({ texto: this.nuevoMensaje, esBot: false });
    setTimeout(() => {
      this.responder();
    }, 1000);
    this.nuevoMensaje = '';
  }
  async responder() {
    const loading = await this.loadingController.create({
      message: 'Recibiendo respuesta...',
    });
    await loading.present();
    setTimeout(() => {
      loading.dismiss();
      const respuesta = 'Hola, ahora mismo no puedo ayudarte';
      this.mensajes.push({ texto: respuesta, esBot: true });
    }, 1000);
  }
  async seleccionarOpcion(opcion: { texto: string; respuesta: string }) {
    this.mensajes.push({ texto: opcion.texto, esBot: false });
    this.opciones = this.opciones.filter((x) => x.texto !== opcion.texto);
    this.mensajes.push({ texto: opcion.respuesta, esBot: true });
  }
}
