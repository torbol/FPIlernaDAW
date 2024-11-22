//Paso 1: Crear una Clase de tareas
  /*Crea una clase llamada Tarea que tenga los
  siguientes atributos: id, descripción y completada.
  La descripción es una cadena de texto que representa la tarea.
  El ID es un número que identifica de manera única cada tarea.
  El valor inicial de completada debe ser false.*/

class Tarea {
  constructor(id, descripcion, fechaVencimiento) {
    this.id = id;
    this.descripcion = descripcion;
    this.completada = false;
    //Paso 7. Añadir fecha a la tarea y generar recordatorios de fechas de vencimiento:
    this.fechaVencimiento = fechaVencimiento;
  }
}

//Paso 2: Crear un Array de Tareas
  /*Crea un array llamado listaDeTareas y agrega al menos tres objetos
  de la clase Tarea a la lista. Estas tareas pueden ser ficticias,
  pero asegúrate de que cada objeto tenga una descripción diferente.*/
const fechaActual = new Date(); //Con new Date() obtenemos tiempo actual, si le pasamos por parámetro una fecha ("2024-12-23") nos crea un objeto date con la fecha indicada (para paso 7). Más info en https://www.w3schools.com/js/js_date_methods.asp
const fechaTarea = new Date(); //Aquí sumaremos los días y con ella haremos cálculos
const listaDeTareas = [ //Con const indicamos que nuestro array no va a ser reasignado después de haberle aplicado los valores, por lo que listaDeTareas no podrá cambiar su valor.
  new Tarea(1, "Comprar pan", fechaTarea.setDate(fechaActual.getDate() + 6)), //Para paso 7, establecemos una fecha de 6 días más a la fecha actual. Más info sobre setDate() en https://www.w3schools.com/js/js_date_methods_set.asp
  new Tarea(2, "Hacer Mojito", fechaTarea.setDate(fechaActual.getDate() + 2)), //Para paso 7, establecemos una fecha de 2 días más a la fecha actual
  new Tarea(3, "Sacar a pasear al perro", fechaTarea.setDate(fechaActual.getDate() - 1)) //Para paso 7, establecemos una fecha de 1 día antes a la fecha actual
];

//Paso 3: Crear una Función para Mostrar Tareas
  /*Escribe una función llamada mostrarTareas que muestre en la pantalla
  la lista de tareas cada una con sus botones para poder
  eliminar y marcar como completada la tarea.*/

function mostrarTareas(estado) { //Usaremos el parámetro estado para el paso 8 y 9. Puede ser true si está completado o false si no lo está
  let elementoTareas = document.getElementById("tareas-lista"); //Seleccionamos el elemento <ul id="tareas-lista"></ul> de lista.html
  elementoTareas.style.overflow = "auto"; //Añadimos posibilidad de hacer scroll en la lista si esta es muy larga. Funcionalidad extra no necesaria para cumplir requisitos ejercicio.
  elementoTareas.innerHTML = ""; //Limpiamos la lista <ul></ul> para que no se dupliquen elementos cada vez que insertemos a esta función
  listaDeTareas.forEach((tarea) => { //Recorremos el array listaDeTareas mediante un foreach
    fechaTarea.setTime(tarea.fechaVencimiento); //Hacemos una copia del timestamp para trabajar con el objeto fechaTarea más fácilmente
    /*Para colorear lo del paso 7: Puedes marcar con distintos colores las tareas dependiendo de si la fecha de vencimiento es
      próxima o no.Por ejemplo:
        ● Amarillo: faltan 7 días
        ● Naranja: faltan 3 días
        ● Rojo: se ha pasado la fecha o es ese mismo día.*/
    let diasRestantes = (fechaTarea.getTime() - fechaActual.getTime())/86400000 //Un día son 86400000 milisegundos, al dividirlo obtengo los días de diferencia entre ambas fechas.
    let estiloColorElementoTareas = ""; //Aquí guardaremos el color del elemento según los días restantes
    if (diasRestantes <= 7 && diasRestantes > 3) //Menor o igual a 7 días y mayor a 3
      estiloColorElementoTareas = "style=\"background: yellow;\"";
    else if (diasRestantes <= 3 && diasRestantes > 0) //Menor o igual a 3 días y mayor a 0
      estiloColorElementoTareas = "style=\"background: orange;\"";
    else if (diasRestantes <= 0) //Menor a 0 o mismo día (fecha pasada)
      estiloColorElementoTareas = "style=\"background: red;\"";

    //Creamos la lista
    let botonTareaCompletada = "<button onclick = \"marcarTareaComoCompletada(" + tarea.id + ")\">Marcar como completada</button>"; //Con \" escapamos las comillas dobles. OJO, pasamos por parámetro el id a marcarTareaComoCompletada(id)
    let botonEliminarTarea = "<button onclick = \"eliminarTarea(" + tarea.id + ")\">Eliminar</button>"; //OJO, pasamos por parámetro el id a eliminarTarea(id)
    if(estado === true && tarea.completada === true) {
      creaLista();
    }
    else if(estado === false && tarea.completada === false) {
      creaLista();
    }
    else if (estado === undefined) {
      creaLista();
    }
    function creaLista() {
      elementoTareas.innerHTML += "<li " + estiloColorElementoTareas + ">" + "Tarea " + tarea.id + ": " + tarea.descripcion + " (Completada: " + tarea.completada + "). " + "Fecha de vencimiento: " + fechaTarea.toLocaleDateString() + botonTareaCompletada + botonEliminarTarea + "</li>"; /*Insertamos nueva lista concatenando. Para paso 7: Con new Date() creamos un objeto fecha que recibirá el atributo fechaVencimiento en milisegundos y lo mostraremos con toLocaleDateString() en formato día/mes/año. Más info en https:/developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleDateString*/
    }
  });
}

//Paso 4: Crear una Función para Agregar Tareas
  /*Escribe una función llamada agregarTarea que tome una
  descripción como argumento y cree una nueva instancia de la
  clase Tarea. Luego, agrega esta nueva tarea al array
  listaDeTareas.*/

function agregarTarea() {
  let descripcionNueva = document.getElementById("descripcion-tarea").value; //Obtenemos nueva descripcion insertada en bloque de texto desde lista.html
  let fechaExpiracionNueva = document.getElementById("fecha-tarea").value; //Obtenemos fecha introducida (paso 7)
  let ultimoIndiceArray = listaDeTareas.length; //La longitud de nuestro array listaDeTareas será el nuevo índice que añadiremos con una nueva tarea
  let ultimoIdTarea;
  if (ultimoIndiceArray === 0) {
    ultimoIdTarea = 1; //Si listaDeTareas está vacío (porque hemos eliminado todas), establecemos el id de tarea en 1
  }
  else { //en caso contrario, lo establecemos en id ultima tarea + 1
    ultimoIdTarea = listaDeTareas[ultimoIndiceArray-1].id + 1; //Será el id de nuestra nueva instancia. Para ello tomamos el último elemento de listaDeTareas y sumamos 1 al último id, esto se lo pasamos como atrinbuto a la nueva instancia (nueva tarea)
  }
  let comprobarContenido = (/[a-zA-Z0-9]/).test(descripcionNueva); //Utilizamos una expresión regular sencilla para comprobar que el campo de texto contenga al menos una letra de la a-z minúsculas, A-Z mayúsculas o ún número del 0-9, con la función pattern.test(str) devolvemos true si las contiene o false si no (por ejemplo si está vacío o solo tiene espacios/otros caracteres no comprendidos devolvería false)
  if (comprobarContenido && fechaExpiracionNueva) { //Comprobamos si el campo Nueva Tarea está vacío o no contiene una tarea válida, en caso contrario, añadimos la nueva tarea.
    //Comprobamos si el contenido de la descripción de la nueva tarea tiene algún < o > ya que estos caracteres rompen el resto del html. Para ello, volvemos a usar una regex
    const caracteresProblematicos = { //Es un objeto clave valor (como los diccionarios en Python). https://www.w3schools.com/js/js_objects.asp
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;'
    };
    let regex = function() { //Creamos función anónima para obtener la regex /[&<>...]/g para que si en un futuro se añade algún valor más en el objeto caracteresProblematicos, no haya que modificar resto del código (solo añadir clave: valor)
      let expresion = ""; //Después la convertiremos en regex con new RegExp("String"). Más info sobre almacenar expresiones regulares en variables https://www.geeksforgeeks.org/how-to-use-a-variable-in-regular-expression-in-javascript/
      let arrayClaves = Object.keys(caracteresProblematicos); //Con Object.keys(objetoClaveValor) obtenemos un array del tipo ['&', '<'...]
      arrayClaves.forEach((caracter) => {
        expresion += caracter;
      });
      expresion	= "[" + expresion + "]";
      return new RegExp(expresion, "g");  //Añadimos al final /g para que si encuentra una coincidencia, no se detenga en la primera coincidencia, sino que siga hasta el final
    };
    descripcionNueva = descripcionNueva.replace(regex(), (caracterEncontrado) => {return caracteresProblematicos[caracterEncontrado];}); //Reemplazamos los caracteres problemáticos con cadena.replace(expresión regular, "reemplazo"). Más info sobre Objetc.keys(objetoClaveValor) https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys
    listaDeTareas.splice(ultimoIndiceArray, 0, new Tarea(ultimoIdTarea, descripcionNueva, new Date(fechaExpiracionNueva)));
    mostrarTareas(); //Para refrescar nuestra lista con nueva tarea
  }
  else
    alert("El campo Nueva Tarea debe contener al menos una letra o un número y una fecha válida");
}

//Paso 5: Crear una Función para Marcar Tareas como Completadas
  /*Escribe una función llamada marcarTareaComoCompletada
  que tome un ID como argumento y marque la tarea
  correspondiente como completada (cambia el valor de
  completada a true).*/

function marcarTareaComoCompletada(id_f) {
  let tarea = listaDeTareas.find((value) => value.id === id_f); //Buscamos la tarea con la función find(myfunction) y myfunction(value, index, array){return...} tal y como se explica en https://www.w3schools.com/js/js_array_search.asp#mark_find
  tarea.completada = true; //Cambiamos el valor a true
  mostrarTareas(); //Para refrescar nuestra lista con tarea Completada
}

//Paso 6: Crear una Función para Eliminar Tareas
  /*Escribe una función llamada eliminarTarea que tome un ID
  como argumento y elimine la tarea correspondiente del array
  listaDeTareas.*/

function eliminarTarea(id_f) {
  let tarea = listaDeTareas.findIndex((tarea) => tarea.id === id_f); //Buscamos el índice de la tarea con la función findIndex(myfunction) y myfunction(value, index, array){return...} tal y como se explica en https://www.w3schools.com/jsref/jsref_findindex.asp
  if(confirm("¿Confirmas que deseas eliminar la Tarea " + id_f + "?")) { //Paso 10. Confirmación de eliminación:Agregar una confirmación antes de eliminar una tarea. Esto evitará la eliminación accidental de tareas importantes
    listaDeTareas.splice(tarea, 1) //Borramos indicando el índice y cúantas tareas borrar (en este caso 1).
    for(let i = tarea; i < listaDeTareas.length; i++ ) {
      listaDeTareas[i].id = i+1; //Actualizamos el valor del id de nuestras tareas que siguen a la que se acaba de borrar
    }
    mostrarTareas(); //Para refrescar nuestra lista con tarea Completada
  }
}

//Paso 7. Añadir campo fecha para insertarla en nuevas tareas
  //Creamos caja para Fecha:
const elementoCajonDescripcion = document.getElementById("descripcion-tarea");
const elementoCajonFecha = document.createElement("input"); //Creamos nuevo elemento
elementoCajonFecha.setAttribute("type", "date"); //Establecemos que sea de tipo date https://www.w3schools.com/jsref/dom_obj_date.asp
elementoCajonFecha.setAttribute("id", "fecha-tarea"); //Establecemos id de nuestro nuevo input
elementoCajonDescripcion.insertAdjacentElement("afterend", elementoCajonFecha); //Insertamos elemento nuevo en html debajo primer input. Más información sobre elementos adyacentes en https://www.w3schools.com/jsref/met_node_insertadjacentelement.asp
  //Aplicamos los estilos al nuevo fecha-tarea para que coincida con descripcion-tarea
elementoCajonFecha.style.width = "50%";
elementoCajonFecha.style.padding = "10px";
elementoCajonFecha.style.border = "1px solid #ccc";
elementoCajonFecha.style.borderRadius = "5px";

//Paso 8.  Mostrar las tareas completadas.
  /*Crear un botón que al pulsar solo muestre aquellas tareas con el campo “completada” a true*/
function crearBoton(funcionalidad, textoBoton) {
  //Con esta función creamos nuevo botón al final del resto de botones para pasos 8 y 9. El parámetro funcionalidad es un Sgtring con nombre función a la que llamará, ej: mostrarCompletadas()
  let ultimoBoton = document.getElementsByTagName("button"); //Como queremos situar nuestro botón nuevo justo después del último botón del html sin tocar nuestro html, cogemos el último botón
  ultimoBoton = ultimoBoton[ultimoBoton.length-1]; //Cogemos siempre el último botón para ir insertando en orden.
  const elementoBotonNuevo = document.createElement("button"); //Creamos nuevo elemento
  elementoBotonNuevo.setAttribute("onclick", funcionalidad);
  elementoBotonNuevo.innerHTML = textoBoton;
  ultimoBoton.insertAdjacentElement("afterend", elementoBotonNuevo);
  //Importante, en este caso no aplicamos estilos, ya que el CSS externo se aplica a todos los elementos botones (no va ni por clases ni id)
}

//Insertamos un botón nuevo en html y creamos la función para paso 8
crearBoton("mostrarCompletadas()", "Mostrar tareas completadas");
function mostrarCompletadas() {
  mostrarTareas(true); //Recuerda, true para ver las completadas y false si no lo está.
}

//Paso 9.  Mostrar las tareas pendientes
  /*Crear un botón que al pulsar solo muestre aquellas tareas con el campo “completada” a false*/
crearBoton("mostrarPendientes()", "Mostrar tareas pendientes");
function mostrarPendientes() {
  mostrarTareas(false); //Recuerda, true para ver las completadas y false si no lo está.
}
