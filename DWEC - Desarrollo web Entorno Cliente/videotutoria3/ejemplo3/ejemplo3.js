/* Se nos pide ampliar el texto introducido en un input
a partir de los botones + y - */

// Declaramos las variables que contendrán nuestros botones y sobre las que ejecutaremos nuestras posteriores funciones
var insertar = document.getElementById('insertar');
var aumentar = document.getElementById('grande');
var disminuir = document.getElementById('pequeno');

// Creamos la función para cambiar el Texto de ejemplo
function changeExampleText() {
    // Obtenemos el texto que hemos introducido después de pulsar el botón Insertar
    let myText = document.getElementsByName("nombre"); // myText será un array de elementos, el elemento [0].value es nuestro texto
    // Cambiamos el Texto de ejemplo
    document.getElementsByClassName("insertado")[0].innerHTML = myText[0].value;
}

// Función para aumentar el tamaño del texto
function maximizeText() {
    let insertedText = document.getElementsByClassName("insertado")[0]; // Con esta variable accedemos a nuestro elemento Texto de ejemplo
    // Aumentamos de 10% en 10% el tamaño de nuestro texto
    let currentSizeText = insertedText.style.fontSize; // Variable local de la función para obtener el valor actual del tamaño de la fuente
    let updatedSize = (parseFloat(currentSizeText) + 10) + "%"; // Variable local a la que añadimos el 10% a la anterior
    insertedText.style.fontSize = updatedSize; // Actualizamos el valor de la fuente por el nuevo en el HTML
}

// Función para diminuir el tamaño del texto
function minimizeText() {
    let insertedText = document.getElementsByClassName("insertado")[0]; // Con esta variable accedemos a nuestro elemento Texto de ejemplo
    // Disminuimos de 10% en 10% el tamaño de nuestro texto
    let currentSizeText = insertedText.style.fontSize; // Variable local de la función para obtener el valor actual del tamaño de la fuente
    let updatedSize = (parseFloat(currentSizeText) - 10) + "%"; // Variable local a la que restamos el 10% a la anterior
    insertedText.style.fontSize = updatedSize; // Actualizamos el valor de la fuente por el nuevo en el HTML
}

// Ejecutamos las correspondientes funciones cuando se presionan botones. Es decir, capturamos el evento onclick de cada botón cuando se produce.
insertar.onclick = changeExampleText;
aumentar.onclick = maximizeText;
disminuir.onclick = minimizeText;
