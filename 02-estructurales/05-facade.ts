/**
 * ! Patrón Facade
 * Este patrón proporciona una interfaz unificada para un conjunto de interfaces
 * en un subsistema.
 *
 * Facade define una interfaz de nivel más alto que hace que el subsistema
 * sea más fácil de usar.
 *
 * * Es útil cuando un subsistema es complejo o difícil de entender para
 * * proporcionar una interfaz simplificada para el cliente.
 *
 * https://refactoring.guru/es/design-patterns/facade
 */

import { COLORS } from "../helpers/colors.ts";

class Projector {
  turnOn() {
    console.log("%cProyector encendido", COLORS.blue);
  }

  turnOff() {
    console.log("%cProyecaor apagado", COLORS.red);
  }
}

class SoundSystem {
  on() {
    console.log("%cSistema de sonido encendido", COLORS.brown);
  }

  off() {
    console.log("%cSistema de sonido apagado", COLORS.pink);
  }
}

class VideoPlayer {
  on() {
    console.log("%cVideo Player encendido", COLORS.cyan);
  }

  play(movie: string) {
    console.log(`Reproduciendo %c${movie}`, COLORS.yellow);
  }

  stop() {
    console.log("%cPelícula detenida", COLORS.purple);
  }

  off() {
    console.log("%cVideo Player apagado", COLORS.orange);
  }
}

class PopcornMaker {
  on() {
    console.log("%cPalomitera encendida", COLORS.gray);
  }

  popping() {
    console.log("%cHaciendo palomitas", COLORS.green);
  }

  serving() {
    console.log("%cSirviendo palomitas", COLORS.white);
  }

  off() {
    console.log("%cPalomitera apagada", COLORS.violet);
  }
}

interface HomeTheaterFacadeOptions {
  projector: Projector;
  soundSystem: SoundSystem;
  videoPlayer: VideoPlayer;
  popcornMaker: PopcornMaker;
}

class HomeTheaterFacade {
  private projector: Projector;
  private soundSystem: SoundSystem;
  private videoPlayer: VideoPlayer;
  private popcornMaker: PopcornMaker;

  constructor(options: HomeTheaterFacadeOptions) {
    this.projector = options.projector;
    this.soundSystem = options.soundSystem;
    this.videoPlayer = options.videoPlayer;
    this.popcornMaker = options.popcornMaker;
  }

  watchMovie(movie: string) {
    console.log("Preparando para ver la película");
    this.projector.turnOn();
    this.soundSystem.on();
    this.popcornMaker.on();
    this.popcornMaker.popping();
    this.videoPlayer.on();
    this.popcornMaker.off();
    this.popcornMaker.serving();
    this.videoPlayer.play(movie);

    console.log("\n\nDisfrute la película");
  }

  endWatchingMovie(): void {
    console.log("\nApagando el sitema de teatro en casa");
    this.videoPlayer.stop();
    this.projector.turnOff();
    this.soundSystem.off();
    this.videoPlayer.off();
    console.log("\nSistema apagado");
  }
}

function main() {
  const options: HomeTheaterFacadeOptions = {
    projector: new Projector(),
    soundSystem: new SoundSystem(),
    videoPlayer: new VideoPlayer(),
    popcornMaker: new PopcornMaker(),
  };
  const homeTheater = new HomeTheaterFacade(options);

  homeTheater.watchMovie("Los vengadores");

  homeTheater.endWatchingMovie();
}

main();
