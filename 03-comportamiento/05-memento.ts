/**
 * !Patrón Memento
 * Permite capturar y externalizar un estado interno de un objeto,
 * de manera que el objeto pueda ser restaurado a ese estado más tarde.
 *
 * * Es útil cuando se necesita guardar el estado de un objeto para poder
 * * volver a él en un futuro.
 *
 * https://refactoring.guru/es/design-patterns/memento
 */

import { COLORS } from '../helpers/colors.ts';

class GameMemento {
  private level: number;
  private health: number;
  private position: string;

  constructor(level: number, health: number, position: string) {
    this.level = level;
    this.health = health;
    this.position = position;
  }

  getLevel(): number {
    return this.level;
  }

  getHealth(): number {
    return this.health;
  }

  getPosition(): string {
    return this.position;
  }
}

class Game {
  private level: number;
  private health: number;
  private position: string;

  constructor(level: number, health: number, position: string) {
    this.level = level;
    this.health = health;
    this.position = position;

    console.log(
      `
        %cJugando en el nivel %c${this.level}
          %csalud: %c${this.health}
          %cposición: %c${this.position} 
      `,
      COLORS.green,
      COLORS.orange,
      COLORS.green,
      COLORS.pink,
      COLORS.green,
      COLORS.red,
    );
  }

  save(): GameMemento {
    console.log('Guardando estado del juego...');
    return new GameMemento(this.level, this.health, this.position);
  }

  play(level: number, health: number, position: string) {
    this.level = level;
    this.health = health;
    this.position = position;

    console.log(
      `
        %cJugando en el nivel %c${this.level}
          %csalud: %c${this.health}
          %cposición: %c${this.position} 
      `,
      COLORS.green,
      COLORS.orange,
      COLORS.green,
      COLORS.pink,
      COLORS.green,
      COLORS.red,
    );
  }

  restore(memento: GameMemento): void {
    this.level = memento.getLevel();
    this.health = memento.getHealth();
    this.position = memento.getPosition();

    console.log(
      `
        %Restauración en el nivel %c${this.level}
          %csalud: %c${this.health}
          %cposición: %c${this.position} 
      `,
      COLORS.gray,
      COLORS.orange,
      COLORS.gray,
      COLORS.pink,
      COLORS.gray,
      COLORS.red,
    );
  }
}

class GameHistory {
  private mementos: GameMemento[] = [];

  push(memento: GameMemento) {
    this.mementos.push(memento);
  }

  pop(): GameMemento | null {
    return this.mementos.pop() ?? null;
  }
}

function main() {
  const game = new Game(10, 100, 'Inicio');
  const history = new GameHistory();

  history.push(game.save());

  // jugador avanza en el juego
  game.play(11, 90, 'Bosque encantado');
  history.push(game.save());

  game.play(13, 82, 'Cueva oscura');

  game.play(14, 81, 'Castillo de piedra');
  history.push(game.save());

  game.play(15, 79, 'Ladera peligrosa');
  console.log('Restaurando juego porque el jugador murió');
  game.restore(history.pop()!);
}

main();
