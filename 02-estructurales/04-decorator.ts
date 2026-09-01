/**
 * ! Patrón decorador
 * Es un patrón de diseño estructural que permite añadir
 * funcionalidades a objetos, colocando estos objetos dentro de
 * objetos encapsuladores especiales que contienen estas funcionalidades.
 *
 * No confundirlo con los decoradores de TypeScript que son anotaciones.
 *
 * * Es útil cuando necesitas añadir funcionalidades a objetos
 *  * de manera dinámica y flexible.
 *
 * https://refactoring.guru/es/design-patterns/decorator
 */

import { COLORS } from "../helpers/colors.ts";

interface Notification {
  send(message: string): void;
}

class BasicNotification implements Notification {
  send(message: string): void {
    console.log(`Enviando notificación básica: %c${message}`, COLORS.pink);
  }
}

// Clase decoradora
abstract class NotificationDecorator implements Notification {
  protected notification: Notification;

  constructor(notification: Notification) {
    this.notification = notification;
  }

  send(message: string): void {
    this.notification.send(message);
  }
}

// crear diferentes decoradores
class EmailDecorator extends NotificationDecorator {
  private sendEmail(message: string) {
    console.log(
      `Enviando notificación por correo electrónico: %c${message}`,
      COLORS.violet,
    );
  }

  override send(message: string): void {
    super.send(message);
    this.sendEmail(message);
  }
}

class SMSDecorator extends NotificationDecorator {
  private sendSMS(message: string) {
    console.log(`Enviando notificación por SMS: %c${message}`, COLORS.brown);
  }

  override send(message: string): void {
    super.send(message);
    this.sendSMS(message);
  }
}
