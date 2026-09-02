/**
 * ! Patrón Proxy
 * Este patrón se utiliza para controlar el acceso a un objeto, es decir,
 * se crea un objeto que actúa como intermediario entre el cliente y el objeto real.
 *
 * * Es útil cuando necesitamos controlar el acceso a un objeto,
 * * por ejemplo, para verificar si el cliente tiene permiso
 * * para acceder a ciertos métodos o propiedades.
 *
 * https://refactoring.guru/es/design-patterns/proxy
 *
 */

import { COLORS } from "../helpers/colors.ts";

class Player {
  public name: string;
  public leveL: number;

  constructor(name: string, level: number) {
    this.name = name;
    this.leveL = level;
  }
}

interface Room {
  enter(player: Player): void;
}

class SecretRoom implements Room {
  enter(player: Player): void {
    console.log(`%cBienvenido a la sala secreta ${player.name}`, COLORS.blue);
    console.log("Un gran enemigo te espera");
  }
}

// 3. Clase proxy - magic portal
class MagicPortal implements Room {
  private secretRoom: SecretRoom;

  constructor(room: SecretRoom) {
    this.secretRoom = room;
  }

  enter(player: Player): void {
    if (player.leveL >= 10) {
      this.secretRoom.enter(player);
      return;
    }

    console.log(
      `%cLo siento mucho ${player.name}, tu nivel ${player.leveL}, es muy bajo, necesitas nivel 10`,
      COLORS.red,
    );
  }
}

function main() {
  const player1 = new Player("Oncho", 11);
  const player2 = new Player("Pepe", 8);
  const portal = new MagicPortal(new SecretRoom());

  console.log(
    `%cJugados ${player1.name} intenta entrar al portal`,
    COLORS.brown,
  );
  portal.enter(player1);

  console.log(
    `%cJugados ${player2.name} intenta entrar al portal`,
    COLORS.yellow,
  );
  portal.enter(player2);
}

main();
