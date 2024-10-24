let pulsar = document.getElementsByTagName('button')[0]; //Obtenemos primer índice del NodeList del botón pulsar
let valorRecogido = document.getElementsByName('valor'); //Obtenemos un NodeList [0:input, [[Prototype]]: NodeList], nosotros queremos el valor valueAsNumber o value (str) dentro del primer índice 0:input
let colorear = document.getElementById('colorear'); //Para luego capturar pulsación botón colorear

//Función para crear la lista
pulsar.onclick = function() {
  let numeroElementosLista = valorRecogido[0].valueAsNumber; //Recogemos el valor entero introducido del índice 0 input del nodeList que guardamos en la variable valorRecogido
  let lista = ""; //En esta variable guardaremos los elementos <li> que posteriormente se insertarán en el código.

  //Creamos los elementos <li> con los números aleatorios indicados y lo vamos concatenando a la cadena lista creada anteriormente.
  for(let i = 0; i < numeroElementosLista; i++) {
    lista += "<li>" + Math.floor(Math.random() * 10) + "</li>"; //Con Math.random() se genera un número entre 0 (incluido) y 1 (excluido, saldrá siempre por debajo), en este caso se multiplica por 10 (para que salga entre 0 y 9) y con Math.floor() se redondea a la baja, de forma que si sale 9.8, el resultado será 9.
  }
  //Creamos la lista completa e insertamos al html
  document.getElementById('resultado').innerHTML = "<ul>" + lista + "</ul>"; //Código de la lista completa insertado en el html, dentro del párrado con id resultado

  //Seleccionamos todos los elementos <li> creados.
  let elementosLista = document.getElementsByTagName('li'); //Devuelve un array HTMLCollection
  //Creamos la función para cambiar la clase a "rojo" si un elemento es par
  function cambiarClase() {
    //Recorremos los números del array y comprobamos cuál es par y le aplicamos el estilo rojo
    for(let i=0; i < elementosLista.length; i++) {
      if (elementosLista[i].innerHTML % 2 == 0) {
        elementosLista[i].classList.add('red'); //Añade clase "red" a los elementos pares
      }
    }
  }
  //Llamamos a la función para añadir la clase rojo a números pares
  cambiarClase();

  //Inicializamos el botón colorear con una función anónima
  colorear.onclick = function() {
    let numeroPar = document.getElementsByClassName('red'); //Devuelve un array HTMLCollection
    for (let i = 0; i < numeroPar.length; i++) {
      numeroPar[i].style.backgroundColor = "red"; //Cambiamos color de fondo elementos pares.
    }
  }
}
