const cartas = [
  ["🍎", "🐶", "⭐", "🚗"],
  ["🍎", "🍕", "🎈", "⚽"],
  ["🍎", "🌙", "🐟", "🚀"],
  ["🍎", "🐱", "🍩", "🌸"],
  ["🐶", "🍕", "🌙", "🐱"],
  ["🐶", "🎈", "🐟", "🍩"],
  ["🐶", "⚽", "🚀", "🌸"],
  ["⭐", "🍕", "🐟", "🌸"],
  ["⭐", "🎈", "🚀", "🐱"],
  ["⭐", "⚽", "🌙", "🍩"],
  ["🚗", "🍕", "🚀", "🍩"],
  ["🚗", "🎈", "🌙", "🌸"],
  ["🚗", "⚽", "🐟", "🐱"]
];

let puntos = 0;
let tiempo = 60;
let temporizador = null;
let simboloCorrecto = "";

const pantallaInicio = document.getElementById("pantalla-inicio");
const pantallaJuego = document.getElementById("pantalla-juego");
const pantallaFinal = document.getElementById("pantalla-final");

const carta1 = document.getElementById("carta-1");
const carta2 = document.getElementById("carta-2");
const mensaje = document.getElementById("mensaje");
const puntosElemento = document.getElementById("puntos");
const tiempoElemento = document.getElementById("tiempo");
const puntuacionFinal = document.getElementById("puntuacion-final");

document.getElementById("boton-jugar").addEventListener("click", empezarJuego);
document.getElementById("boton-reiniciar").addEventListener("click", empezarJuego);
document.getElementById("boton-volver").addEventListener("click", empezarJuego);

function empezarJuego() {
  puntos = 0;
  tiempo = 60;
  mensaje.textContent = "";
  puntosElemento.textContent = puntos;
  tiempoElemento.textContent = tiempo;

  pantallaInicio.classList.remove("activa");
  pantallaFinal.classList.remove("activa");
  pantallaJuego.classList.add("activa");

  mostrarCartas();

  clearInterval(temporizador);
  temporizador = setInterval(cuentaAtras, 1000);
}

function cuentaAtras() {
  tiempo--;
  tiempoElemento.textContent = tiempo;

  if (tiempo <= 0) {
    clearInterval(temporizador);
    terminarJuego();
  }
}

function terminarJuego() {
  pantallaJuego.classList.remove("activa");
  pantallaFinal.classList.add("activa");
  puntuacionFinal.textContent = puntos;
}

function mostrarCartas() {
  const numero1 = Math.floor(Math.random() * cartas.length);
  let numero2 = Math.floor(Math.random() * cartas.length);

  while (numero2 === numero1) {
    numero2 = Math.floor(Math.random() * cartas.length);
  }

  const primeraCarta = cartas[numero1];
  const segundaCarta = cartas[numero2];

  simboloCorrecto = "";

  for (let i = 0; i < primeraCarta.length; i++) {
    if (segundaCarta.includes(primeraCarta[i])) {
      simboloCorrecto = primeraCarta[i];
    }
  }

  pintarCarta(carta1, primeraCarta);
  pintarCarta(carta2, segundaCarta);
}

function pintarCarta(carta, simbolos) {
  carta.innerHTML = "";

  for (let i = 0; i < simbolos.length; i++) {
    const simbolo = document.createElement("span");
    simbolo.textContent = simbolos[i];
    simbolo.classList.add("simbolo");

    simbolo.addEventListener("click", function () {
      comprobarSimbolo(simbolos[i]);
    });

    carta.appendChild(simbolo);
  }
}

function comprobarSimbolo(simboloElegido) {
  if (simboloElegido === simboloCorrecto) {
    puntos++;
    puntosElemento.textContent = puntos;
    mensaje.textContent = "¡Correcto!";
    mensaje.style.color = "green";
    mostrarCartas();
  } else {
    mensaje.textContent = "Ese símbolo no se repite";
    mensaje.style.color = "red";
  }
}








