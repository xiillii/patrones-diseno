/**
 * !Patrón Visitor
 *
 * El patrón Visitor es un patrón de diseño de comportamiento
 * que te permite separar algoritmos de los objetos sobre
 * los que operan.
 *
 * * Es útil cuando necesitas añadir nuevas operaciones a
 * * clases estables sin cambiar su código.
 *
 * https://refactoring.guru/es/design-patterns/visitor
 */

import { COLORS } from '../helpers/colors.ts';

/**
 * Contexto: Imagina que estás diseñando un sistema para un parque
 * temático con diferentes tipos de atracciones:
 * montañas rusas, casas del terror y ruedas de la fortuna.
 *
 * Cada atracción tiene su propio precio de entrada y ofrece un descuento
 * dependiendo del tipo de visitante (niño, adulto o adulto mayor).
 *
 * Aquí es donde entra el patrón Visitor, que permite aplicar operaciones
 * específicas (como calcular el precio con descuento) dependiendo tanto
 * de la atracción como del tipo de visitante,
 * sin modificar las clases originales.
 */

interface Visitor {
  visitRollerCoaster(rollerCoaster: RollerCoaster): void;
  visitHauntedHouse(hauntedHouse: HauntedHouse): void;
  visitFerrisWheel(ferrisWheel: FerrisWheel): void;
}

interface Attraction {
  accept(visitor: Visitor): void;
}

class RollerCoaster implements Attraction {
  private price: number = 50;

  getPrice(): number {
    return this.price;
  }

  accept(visitor: Visitor): void {
    visitor.visitRollerCoaster(this);
  }
}

class HauntedHouse implements Attraction {
  private price: number = 40;

  getPrice(): number {
    return this.price;
  }

  accept(visitor: Visitor): void {
    visitor.visitHauntedHouse(this);
  }
}

class FerrisWheel implements Attraction {
  private price: number = 30;

  getPrice(): number {
    return this.price;
  }

  accept(visitor: Visitor): void {
    visitor.visitFerrisWheel(this);
  }
}

// Visitors
class ChildVisitor implements Visitor {
  visitRollerCoaster(rollerCoaster: RollerCoaster): void {
    console.log(
      `%cNiño en Montaña Rusa: Precio con descuento de ${
        rollerCoaster.getPrice() * 0.5
      }`,
      COLORS.brown,
    );
  }
  visitHauntedHouse(hauntedHouse: HauntedHouse): void {
    console.log(
      `%cNiño en Casa Embrujada: Precio con descuento de ${
        hauntedHouse.getPrice() * 0.7
      }`,
      COLORS.brown,
    );
  }
  visitFerrisWheel(ferrisWheel: FerrisWheel): void {
    console.log(
      `%cNiño en Rueda de la Fortuna: Precio con descuento de ${
        ferrisWheel.getPrice() * 0.6
      }`,
      COLORS.brown,
    );
  }
}

class AdultVisitor implements Visitor {
  visitRollerCoaster(rollerCoaster: RollerCoaster): void {
    console.log(
      `%cAdulto en Montaña Rusa: Precio con descuento de ${rollerCoaster.getPrice()}`,
      COLORS.cyan,
    );
  }
  visitHauntedHouse(hauntedHouse: HauntedHouse): void {
    console.log(
      `%cAdulto en Casa Embrujada: Precio con descuento de ${hauntedHouse.getPrice()}`,
      COLORS.cyan,
    );
  }
  visitFerrisWheel(ferrisWheel: FerrisWheel): void {
    console.log(
      `%cAdulto en Rueda de la Fortuna: Precio con descuento de ${ferrisWheel.getPrice()}`,
      COLORS.cyan,
    );
  }
}

class SeniorVisitor implements Visitor {
  visitRollerCoaster(rollerCoaster: RollerCoaster): void {
    console.log(
      `%cAdulto en Montaña Rusa: Precio con descuento de ${
        rollerCoaster.getPrice() * 85
      }`,
      COLORS.pink,
    );
  }
  visitHauntedHouse(hauntedHouse: HauntedHouse): void {
    console.log(
      `%cAdulto en Casa Embrujada: Precio con descuento de ${
        hauntedHouse.getPrice() * 85
      }`,
      COLORS.pink,
    );
  }
  visitFerrisWheel(ferrisWheel: FerrisWheel): void {
    console.log(
      `%cAdulto en Rueda de la Fortuna: Precio con descuento de ${
        ferrisWheel.getPrice() * 85
      }`,
      COLORS.pink,
    );
  }
}

function main() {
  const rollerCoaster = new RollerCoaster();
  const hauntedHouse = new HauntedHouse();
  const ferrisWheel = new FerrisWheel();

  const child = new ChildVisitor();

  child.visitRollerCoaster(rollerCoaster);
  child.visitHauntedHouse(hauntedHouse);
  child.visitFerrisWheel(ferrisWheel);

  const adult = new AdultVisitor();

  adult.visitRollerCoaster(rollerCoaster);
  adult.visitHauntedHouse(hauntedHouse);
  adult.visitFerrisWheel(ferrisWheel);

  const senior = new SeniorVisitor();

  senior.visitRollerCoaster(rollerCoaster);
  senior.visitHauntedHouse(hauntedHouse);
  senior.visitFerrisWheel(ferrisWheel);
}

main();
