import { Component, NgModule } from '@angular/core';

class Registro {
  nombre: string;
  apellido1: string;
  apellido2: string;
  telefono: string;
  fecha: Date;
  email: string;
  password: string;
  password2: string;

  constructor(nombre: string, apellido1: string, apellido2: string, telefono: string, fecha: Date, email: string, password: string, password2: string) {
    this.nombre = nombre;
    this.apellido1 = apellido1;
    this.apellido2 = apellido2;
    this.telefono = telefono;
    this.fecha = fecha;
    this.email = email;
    this.password = password;
    this.password2 = password2;
  }

  toString(): string {
    return `Nombre: ${this.nombre}\nApellido1: ${this.apellido1}\nApellido2: ${this.apellido2}\nTeléfono: ${this.telefono}\nFecha de Nacimiento: ${this.fecha}\nCorreo Electrónico: ${this.email}\nContraseña: ${this.password}`;
  }
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  registro: Registro = new Registro('', '', '', '', new Date(), '', '', ''); // Inicialización de la instancia de Registro

  toggleTheme(): void {
    const checkbox: HTMLInputElement | null = document.getElementById("theme-toggle") as HTMLInputElement;
    if (checkbox && checkbox.checked) {
      document.body.classList.add("dark-theme");
    } else {
      document.body.classList.remove("dark-theme");
    }
  }

  mostrarPassword(): void {
    const passwordInput: HTMLInputElement | null = document.getElementById("password") as HTMLInputElement;
    if (passwordInput) {
      if (passwordInput.type === "password") {
        passwordInput.setAttribute("data-valor-contrasena", passwordInput.value);
        passwordInput.type = "text";
      } else {
        passwordInput.type = "password";
        passwordInput.value = passwordInput.getAttribute("data-valor-contrasena") || "";
      }
    }
  }

  generarPassword(): void {
    let longitud = 16;
    let caracteres = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let nuevaContrasena = '';

    for (let i = 0; i < longitud; i++) {
      let indiceCaracter = Math.floor(Math.random() * caracteres.length);
      nuevaContrasena += caracteres.charAt(indiceCaracter);
    }

    let bloque1 = nuevaContrasena.substring(0, 4);
    let bloque2 = nuevaContrasena.substring(4, 8);
    let bloque3 = nuevaContrasena.substring(8, 12);
    let bloque4 = nuevaContrasena.substring(12, 16);

    var contrasenaConcatenada = bloque1 + "-" + bloque2 + "-" + bloque3 + "-" + bloque4;

    var contrasenaInput = document.getElementById('password') as HTMLInputElement;
    var repetirContrasenaInput = document.getElementById('password2') as HTMLInputElement;

    contrasenaInput.value = contrasenaConcatenada;
    repetirContrasenaInput.value = contrasenaConcatenada;
  }

  validarNombreApellido(): boolean {
    let nombre: string = (document.getElementById("nombre") as HTMLInputElement).value;
    let apellido1: string = (document.getElementById("apellido1") as HTMLInputElement).value;

    if (nombre && apellido1) {
      return true;
    } else {
      this.mostrarAlerta("Nombre y Primer Apellido no deben estar vacíos.");
      return false;
    }
  }

  validarEmail(): boolean {
    let email: string = (document.getElementById("email") as HTMLInputElement).value;
    let emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (emailRegex.test(email)) {
      return true;
    } else {
      this.mostrarAlerta("El email no tiene un formato válido.");
      return false;
    }
  }

  validarPassword(): boolean {
    let password: string = (document.getElementById("password") as HTMLInputElement).value;
    let password2: string = (document.getElementById("password2") as HTMLInputElement).value;

    if (password === password2) {
      return true;
    } else {
      this.mostrarAlerta("Las contraseñas deben ser iguales.");
      return false;
    }
  }

  mostrarAlerta(mensaje: string): void {
    const zonaRoja = document.getElementById('validacion-incumplida');
    if (zonaRoja) {
      const mensajeError = document.createElement('p');
      mensajeError.style.fontWeight = 'bold';
      mensajeError.style.marginTop = '15px';
      mensajeError.textContent = mensaje;
      zonaRoja.appendChild(mensajeError);
      this.mostrarZonaRoja();
    }
  }

  mostrarZonaRoja(): void {
    const zonaRoja = document.getElementById('validacion-incumplida');
    const emoticonoAlerta = document.getElementById('emoticono-alerta');
    if (zonaRoja && emoticonoAlerta) {
      zonaRoja.style.display = 'block';
      emoticonoAlerta.style.display = 'inline';
    }
  }

  ocultarZonaRoja(): void {
    const zonaRoja = document.getElementById('validacion-incumplida');
    const emoticonoAlerta = document.getElementById('emoticono-alerta');
    if (zonaRoja && emoticonoAlerta) {
      zonaRoja.style.display = 'none';
      emoticonoAlerta.style.display = 'none';
    }
  }

  registrar(): void {
    const nombre: string = (document.getElementById("nombre") as HTMLInputElement).value;
    const apellido1: string = (document.getElementById("apellido1") as HTMLInputElement).value;
    const apellido2: string = (document.getElementById("apellido2") as HTMLInputElement).value;
    const telefono: string = (document.getElementById("telefono") as HTMLInputElement).value;
    const fecha: string = (document.getElementById("fecha") as HTMLInputElement).value;
    const fecha_date: Date = new Date(fecha);
    const email: string = (document.getElementById("email") as HTMLInputElement).value;
    const password: string = (document.getElementById("password") as HTMLInputElement).value;
    const password2: string = (document.getElementById("password2") as HTMLInputElement).value;

    const registro: Registro = new Registro(nombre, apellido1, apellido2, telefono, fecha_date, email, password, password2);

    alert(registro.toString());
  }

  validarFormulario(): boolean {
    const nombreApellidoValido = this.validarNombreApellido();
    const emailValido = this.validarEmail();
    const contrasenaValida = this.validarPassword();

    if (!nombreApellidoValido || !emailValido || !contrasenaValida) {
      this.mostrarZonaRoja();
      return false;
    } else {
      this.ocultarZonaRoja();
      this.registrar();
      return true;
    }
  }
}
