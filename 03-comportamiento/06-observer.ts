/**
 * ! Patrón Observer
 * El patrón Observer es un patrón de diseño de comportamiento que establece
 * una relación de uno a muchos entre un objeto, llamado sujeto,
 * y otros objetos, llamados observadores, que son notificados
 * y actualizados automáticamente por el sujeto
 * cuando se producen cambios en su estado.
 *
 * * Es útil cuando necesitamos que varios objetos estén
 * * pendientes de los cambios
 *
 * !No confundirlo con RXJS Observables
 *
 * https://refactoring.guru/es/design-patterns/observer
 */

import { COLORS } from '../helpers/colors.ts';

interface Observer {
  notify(videoTitle: string): void;
}

class YouTubeChannel {
  private subscribers: Observer[] = [];
  private name: string;

  constructor(name: string) {
    this.name = name;
  }

  subscribe(subscriber: Observer): void {
    this.subscribers.push(subscriber);
    console.log(`Nuevo suscriptor al canal %c${this.name}`, COLORS.orange);
  }

  unsubscribe(subscriber: Observer): void {
    this.subscribers = this.subscribers.filter((sub) => sub !== subscriber);
    console.log(`%cSuscriptor al canal ${this.name} eliminado`, COLORS.red);
  }

  uploadVideo(videoTitle: string): void {
    console.log(`Canal ${this.name} ha subido un nuevo video: ${videoTitle}`);
    for (const subscriber of this.subscribers) {
      subscriber.notify(videoTitle);
    }
  }
}

class Subscriber implements Observer {
  private name: string;

  constructor(name: string) {
    this.name = name;
  }

  notify(videoTitle: string): void {
    console.log(`${this.name} ha sido notificado: Nuevo video ${videoTitle}`);
  }
}

function main() {
  const channel = new YouTubeChannel('Cocinando con Oncho');

  const gab = new Subscriber('Gabs');
  const ratona = new Subscriber('Ratona');
  const poncho = new Subscriber('Poncho');

  channel.subscribe(gab);

  channel.uploadVideo('Cómo cocinar arroz con leche');

  channel.subscribe(poncho);
  channel.uploadVideo('Cómo cocinar frijoles');

  channel.unsubscribe(gab);

  channel.subscribe(ratona);

  channel.uploadVideo('Cómo cocinar ensalada');
}

main();
