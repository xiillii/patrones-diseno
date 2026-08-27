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

class ChickenHamburger implements Hamburger {
  prepare(): void {
    console.log("Preparando una hamburgesa de %cpollo", COLORS.yellow);
  }
}

class BeefHamburger implements Hamburger {
  prepare(): void {
    console.log("Preparando una hamburgesa de %cres", COLORS.brown);
  }
}

abstract class Restaurant {
  abstract createHamburger(): Hamburger;

  orderHamburger(): void {
    const hamburger = this.createHamburger();

    hamburger.prepare();
  }
}

class ChickenRestaurant extends Restaurant {
  override createHamburger(): Hamburger {
    return new ChickenHamburger();
  }
}

class BeefRestaurant extends Restaurant {
  override createHamburger(): Hamburger {
    return new BeefHamburger();
  }
}

function main() {
  let restaurant: Restaurant;

  console.log(
    "¿Tipo de hamburgesa, [%cP%c]ollo, [%cR%c]es",
    COLORS.yellow,
    COLORS.reset,
    COLORS.brown,
    COLORS.reset,
  );
  const burgerType = prompt("-");

  switch (burgerType?.toLocaleLowerCase()) {
    case "p":
      restaurant = new ChickenRestaurant();
      break;
    case "r":
      restaurant = new BeefRestaurant();
      break;
    default:
      throw new Error("Opción no válida");
  }

  restaurant.orderHamburger();
}

main();
