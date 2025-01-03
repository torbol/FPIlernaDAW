// Este array no se puede modificar,
var posibilidades = ["piedra", "papel", "tijera"];
//    //

//Guardamos en constantes botones, campos y elementos del DOM con los que vamos a trabajar
const botones = document.querySelectorAll("button");
const botonJugar = botones[0], botonYa = botones[1], botonReset = botones[2];
const inputs = document.querySelectorAll("input");
const campoNombre = inputs[0], campoNumeroPartidas = inputs[1];
const spanActual = document.querySelector("#actual"); /*La declaración como constante crea una referencia de solo lectura, lo que no significa que el valor que tenga sea inmutable, sino que el identificador de variable no puede ser reasignado, en el caso de que la asignación a la constante sea un objeto, el objeto sí que puede ser alterado.*/
const spanTotal = document.querySelector("#total");
const imgDivJugador = document.querySelectorAll("#jugador img"); /*Devuelve NodeList[0 -> piedra, 1 -> papel, 2 -> tijera], es decir elementos img dentro del div jugador*/
const imgDivMaquina = document.querySelector("#maquina img");
//Creamos una clase Partida e inicializamos un objeto donde guardaremos cada jugada de Jugador y Maquina
class Partida {
  constructor(jugadaJugador = posibilidades[0], jugadaMaquina = null, indiceJugadaJugador = 0, indiceJugadaMaquina = null, resultado = null) {
    this.jugadaJugador = jugadaJugador; /*piedra, papel o tijera. Por defecto piedra*/
    this.jugadaMaquina = jugadaMaquina;
    this.indiceJugadaJugador = indiceJugadaJugador; /*Por defecto será 0 por si el usuario deja seleccionada la piedra, pero pueden ser 0, 1, 2*/
    this.indiceJugadaMaquina = indiceJugadaMaquina;
    this.resultado = resultado /*Resultado partida Jugador (gana, pierde o empata)*/
  }
  /*Establecemos los getters y setters*/
  set setJugadaJugador(nuevaJugadaJugador) {
    this.jugadaJugador = nuevaJugadaJugador;
  }
  set setJugadaMaquina(nuevaJugadaMaquina) {
    this.jugadaMaquina = nuevaJugadaMaquina;
  }
  set setIndiceJugadaJugador(nuevoIndiceJugadaJugador) {
    this.indiceJugadaJugador = nuevoIndiceJugadaJugador;
  }
  set setIndiceJugadaMaquina(nuevoIndiceJugadaMaquina) {
    this.indiceJugadaMaquina = nuevoIndiceJugadaMaquina;
  }
  set setResultado(nuevoResultado) {
    this.resultado = nuevoResultado;
  }
  get getJugadaJugador() {
    return this.jugadaJugador;
  }
  get getJugadaMaquina() {
    return this.jugadaMaquina;
  }
  get getIndiceJugadaJugador() {
    return this.indiceJugadaJugador;
  }
  get getIndiceJugadaMaquina() {
    return this.indiceJugadaMaquina;
  }
  get getResultado() {
    return this.resultado;
  }
}
/*Creamos e inicializamos variable jugadas instanciando
un objeto de la clase partida, cuyos atributos iremos
actualizando posteriormente por cada una de las partidas*/
let jugadas  = new Partida();
//Obtenemos la lista donde guardaremos el historial de la partidas
const historialPartida = document.querySelector("#historial");
//Configuración de la aplicación: Botones, eventos asociados
botonJugar.addEventListener("click", comienzoPartida);
/*Configuración de la aplicación: Opciones del jugador*/
for (let i = 0; i < imgDivJugador.length; i++) {
  /*Cargamos cada una de las imágenes*/
  imgDivJugador[i].src = "img/" + posibilidades[i] + "Jugador.png";
  /*Asignamos el evento para elección jugador, pasando por parámetro el índice de la imagen que ha desencadenado el evento*/
  imgDivJugador[i].addEventListener("click", function () {eleccion(i);});
}

botonYa.addEventListener("click", tirada);
botonReset.addEventListener("click", reset);

function comienzoPartida() {
  /*Primero comprobamos si se ha introducido un nombre válido, se nos pide:
  1. Longitud mayor a 3 caracteres y que primer caracter no sea un número.
  2. A partir del segundo caracter se acepta cualquier caracter
  Mejora: se aceptarán solo caracteres que no rompan el html*/
  let condicionesCampoNombre = (/^[^"&'<>0-9][^"&'<>]{3,}$/).test(campoNombre.value);
  /*Segundo, comprobamos que número partidas introducido sea mayor que 0*/
  let condicionesCampoNumeroPartidas = Number(campoNumeroPartidas.value) > 0;
  const eliminarFondoRojoCampoNombre = function () {campoNombre.removeAttribute("class");}; /*Eliminamos de campoNombre el atributo class="fondoRojo", por si antes se introdujo algún valor inválido*/
  const eliminarFondoRojoCampoNumeroPartidas = function () {campoNumeroPartidas.removeAttribute("class");}; /*Eliminamos de campoNumeroPartidas el atributo class="fondoRojo", por si antes se introdujo algún valor inválido*/
  if (condicionesCampoNombre && condicionesCampoNumeroPartidas) { /*Cuando los dos campos son válidos*/
    /*Eliminamos los fondos rojos si tenían*/
    eliminarFondoRojoCampoNombre();
    eliminarFondoRojoCampoNumeroPartidas();
    /*Desactivamos los campos*/
    desactivarCampos();
    /*Insertamos valor volcado en span total (tiradas totales que se pueden realizar)*/
    spanTotal.innerHTML =  Number(campoNumeroPartidas.value);
  }
  if (!condicionesCampoNombre) { /*Si no se cumplen condiciones para campoNombre, se pinta de rojo*/
    campoNombre.setAttribute("class", "fondoRojo"); /*Insertamos al campoNombre el atributo class="fondoRojo"*/
  } else { /*Si está correcto, se elimina el atributo class*/
    eliminarFondoRojoCampoNombre();
  }
  if (!condicionesCampoNumeroPartidas) { /*Si no se cumplen condiciones para campoNumeroPartidas, se pinta de rojo*/
    campoNumeroPartidas.setAttribute("class", "fondoRojo"); /*Insertamos al campoNumeroPartidas el atributo class="fondoRojo"*/
  } else { /*Si está correcto, se elimina el atributo class*/
    eliminarFondoRojoCampoNumeroPartidas();
  }
}

function eleccion(indiceImgDivJugador) {
  /*Guardamos la elección del jugador e índice en atributos de objeto jugadas*/
  jugadas.setJugadaJugador = posibilidades[indiceImgDivJugador];
  jugadas.setIndiceJugadaJugador = indiceImgDivJugador;
  /*Cambiamos clase de imagen seleccionada por jugador a seleccionado*/
  for (let i = 0; i < imgDivJugador.length; i++) {
    imgDivJugador[i].classList.replace("seleccionado", "noSeleccionado");
  }
  imgDivJugador[indiceImgDivJugador].classList.replace("noSeleccionado", "seleccionado");
}

function tirada() { /*Esta función se llamará cuando se presione botón YA*/
  let condicionCamposDisabled = campoNombre.disabled && campoNumeroPartidas.disabled; /*Comprobamos que se haya pulsado Jugar y que los campos de texto estén bloqueados*/
  let condicionMaxPartidas = Number(spanActual.innerHTML) < Number(spanTotal.innerHTML); /*Marcamos como tope de partidas de la máquina los establecidos por el jugador anteriormente. Recuerda que empezamos en 0*/
  if (condicionCamposDisabled && condicionMaxPartidas) {
    jugadas.setIndiceJugadaMaquina = Math.floor(Math.random() * posibilidades.length); /*Devolvemos un número entre 0 (incluido) y n-1 (incluido) según longitud del array posibilidades*/
    jugadas.setJugadaMaquina = posibilidades[jugadas.getIndiceJugadaMaquina];
    imgDivMaquina.src = "img/" + jugadas.getJugadaMaquina + "Ordenador.png";
    spanActual.innerHTML = Number(spanActual.innerHTML) + 1;
    /*Calculamos el resultado de la partida de acuerdo con
              Posición Máquina (n) array gana a -> Jugador
              0 (piedra) -> 2 (tijeras)
              1 (papel) -> 0 (piedra)
              2 (tijera) -> 1 (papel)
      general     n      ->    n-1
    */
    if(jugadas.getIndiceJugadaMaquina === jugadas.getIndiceJugadaJugador) {
      jugadas.setResultado = "Empate";
    } else if (jugadas.getIndiceJugadaMaquina === 0 && (jugadas.getIndiceJugadaJugador === posibilidades.length - 1)) { /*posición array 0 gana a última*/
      jugadas.setResultado = "Gana la máquina";
    } else if (jugadas.getIndiceJugadaMaquina > 0 && (jugadas.getIndiceJugadaJugador === jugadas.getIndiceJugadaMaquina - 1)) { /*Posición n (Máquina) mayor a 0 del array siempre gana a n-1 (Jugador)*/
      jugadas.setResultado = "Gana la máquina";
    } else { /*El resto de veces, gana Jugador*/
      jugadas.setResultado = "Gana " + campoNombre.value;
    }
    /*Imprimimos el resultado en el historial de la partida*/
    historialPartida.innerHTML += "<li>" + jugadas.getResultado + "</li>";
  }
}

function reset() {
  /*Reactivamos los campos, establecemos campoNumeroPartidas a 0,
   ponemos a 0 los contadores de partida "actual" y "total",
   cambia imagen por defecto opción máquina*/
  historialPartida.innerHTML += "<li>Nueva partida</li>";
  desactivarCampos(false);
  campoNumeroPartidas.value = 0;
  spanActual.innerHTML = 0, spanTotal.innerHTML = 0;
  imgDivMaquina.src = "img/defecto.png";
  /*Refrescamos clase "seleccionado" de las imágenes a como venía por defecto (en piedra)*/
  for (let i = 0; i < imgDivJugador.length; i++) {
    imgDivJugador[i].classList.replace("seleccionado", "noSeleccionado");
  }
  imgDivJugador[0].classList.replace("noSeleccionado", "seleccionado");
  /*Asignamos nueva instancia con valores por defecto a la variable jugadas,
  la instancia anterior será eliminada en algún momento por el recolector de basura de js*/
  jugadas = new Partida();
}

function desactivarCampos(estado = true) { /*Por defecto si no se pasa parámetro estado, será desactivar (true). Si es false, reactivamos*/
  campoNombre.disabled = estado;
  campoNumeroPartidas.disabled = estado;
}
