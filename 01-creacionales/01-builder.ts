/**
 * ! Patrón Builder:
 * Es un patrón de diseño creacional que nos permite construir objetos complejos
 * paso a paso.
 *
 * El patrón nos permite producir distintos tipos y representaciones
 * de un objeto empleando el mismo código de construcción.
 *
 * * Es útil cuando necesitamos construir un objeto complejo con muchas partes
 * * y queremos que el proceso de construcción sea independiente de las partes
 * * que lo componen.
 *
 * https://refactoring.guru/es/design-patterns/builder
 */

import { COLORS } from "../helpers/colors.ts";

class Computer {
  public cpu: string = "cpu - not defined";
  public ram: string = "ram - not defined";
  public storage: string = "storage - not defined";
  public gpu?: string;

  displayConfiguration() {
    console.log(`Configuración de la computadora
        CPU: ${this.cpu}
        RAM: ${this.ram}
        Almacenamiento: ${this.storage}
        GPU: ${this.gpu}
        `);
  }
}

class ComputerBuilder {
  private _computer: Computer;

  constructor() {
    this._computer = new Computer();
  }

  setCPU(cpu: string): ComputerBuilder {
    this._computer.cpu = cpu;

    return this;
  }

  setRAM(ram: string): ComputerBuilder {
    this._computer.ram = ram;

    return this;
  }

  setStorage(storage: string): ComputerBuilder {
    this._computer.storage = storage;

    return this;
  }

  setGPU(gpu: string): ComputerBuilder {
    this._computer.gpu = gpu;

    return this;
  }

  build() {
    return this._computer;
  }
}

function main() {
  const basicComputer: Computer = new ComputerBuilder()
    .setCPU("Intel Core 2 duo")
    .setRAM("4 GB")
    .setStorage("256 GB")
    .build();

  const gamerComputer: Computer = new ComputerBuilder()
    .setCPU("Intel Core 9i")
    .setRAM("64 GB")
    .setStorage("1 TB")
    .setGPU("NVidia 5072 Ti")
    .build();

  console.log("%cComputadora básica:", COLORS.blue);
  basicComputer.displayConfiguration();

  console.log("%cComputadora gamer:", COLORS.cyan);
  gamerComputer.displayConfiguration();
}

main();
