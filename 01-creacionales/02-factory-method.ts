/**
 * ! Factory Method:
 * El patrón Factory Method permite crear objetos sin especificar
 * la clase exacta del objeto que se creará.
 *
 * En lugar de eso, delegamos la creación de objetos a subclases o métodos
 * que encapsulan esta lógica.
 *
 * * Es útil cuando una clase no puede anticipar la clase
 * * de objetos que debe crear.
 *
 * https://refactoring.guru/es/design-patterns/factory-method
 *
 */

import { COLORS } from "../helpers/colors.ts";

interface Hamburger {
  prepare(): void;
}

class ChickedHamburger implements Hamburger {
  prepare(): void {
    console.log("Preparando una hamburgesa de %cpollo", COLORS.yellow);
  }
}

class BeefHamburger implements Hamburger {
  prepare(): void {
    console.log("Preparando una hamburgesa de %cres", COLORS.brown);
  }
}

function main() {
  let hP: Hamburger = new ChickedHamburger();

  hP.prepare();

  hP = new BeefHamburger();

  hP.prepare();
}

main();
