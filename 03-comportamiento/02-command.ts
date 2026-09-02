/**
 * ! Patrón Command
 * Este patrón encapsula una solicitud como un objeto,
 * lo que le permite parametrizar otros objetos con diferentes solicitudes,
 * encolar solicitudes, o registrar solicitudes, y soporta operaciones que pueden deshacerse.
 *
 * Me gustó mucho la explicación de Refactoring Guru
 * https://refactoring.guru/es/design-patterns/command
 *
 * * Es útil cuando se necesita desacoplar el objeto que invoca
 * * la operación del objeto que sabe cómo realizarla.
 */

import { COLORS } from '../helpers/colors.ts';

interface Command {
  execute(): void;
}

class Light {
  turnOn(): void {
    console.log('%cLa luz está encendida', COLORS.yellow);
  }

  turnOff(): void {
    console.log('%cLa luz está apagada', COLORS.gray);
  }
}

class Fan {
  on(): void {
    console.log('%cEl ventilador está encendido', COLORS.green);
  }

  off(): void {
    console.log('%cEl ventilador está apagado', COLORS.gray);
  }
}

class LightOnCommand implements Command {
  constructor(private light: Light) {}

  execute(): void {
    this.light.turnOn();
  }
}

class LightOffCommand implements Command {
  constructor(private light: Light) {}

  execute(): void {
    this.light.turnOff();
  }
}

class FanOnCommand implements Command {
  constructor(private fan: Fan) {}

  execute(): void {
    this.fan.on();
  }
}

class FanOffCommand implements Command {
  constructor(private fan: Fan) {}

  execute(): void {
    this.fan.off();
  }
}

class RemoteControl {
  private commands: Record<string, Command> = {};

  setCommand(button: string, command: Command) {
    this.commands[button] = command;
  }
  pressButton(button: string): void {
    if (this.commands[button]) {
      this.commands[button].execute();
      return;
    }

    console.log(
      `%cNo se ha asignado un commando al botón: %c${button}`,
      COLORS.red,
      COLORS.cyan,
    );
  }
}

function main() {
  const remote = new RemoteControl();
  const light = new Light();
  const fan = new Fan();

  // crear los comando
  const lighOnCommand = new LightOnCommand(light);
  const lighOffCommand = new LightOffCommand(light);
  const fanOnCommand = new FanOnCommand(fan);
  const fanOffCommand = new FanOffCommand(fan);

  // crear los botones
  remote.setCommand('1', lighOnCommand);
  remote.setCommand('2', lighOffCommand);
  remote.setCommand('3', fanOnCommand);
  remote.setCommand('4', fanOffCommand);

  remote.pressButton('1');
  remote.pressButton('2');
  remote.pressButton('3');
  remote.pressButton('4');
  remote.pressButton('5');
}

main();
