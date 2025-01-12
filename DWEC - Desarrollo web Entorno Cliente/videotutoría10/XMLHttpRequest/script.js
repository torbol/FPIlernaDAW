//Obtener una referencia al elemento de imagen y al botón
let imagen = document.getElementsByTagName("img")[0];
let button = document.getElementsByTagName("button")[0];

//Manejador de eventos para que al pulsar botón realice solicitud a servidor.
button.addEventListener("click", imageUpdater);

//Actualiza la imagen en la página según número aleatorio recibido del servidor
function imageUpdater() {
    /*Creamos nuevo objeto XMLHttpRequest para gestionar conexión con servidor e intercambiar datos*/
    let xhr = new XMLHttpRequest();
    /*Abrimos una conexión con el servidor y elegimos el método de envío*/
    xhr.open("GET", "aleatorio.php", true);

    /*Esperamos que hayan cambios en el objeto xhr para lanzar función anónima con onreadystatechange, más info en https://www.w3schools.com/xml/ajax_xmlhttprequest_response.asp*/
    xhr.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200) {
            imagen.src = "./img/" + xhr.responseText + ".png";
        } else {
            imagen.src = "./img/error.png"; /*En caso de fallo al obtener respuesta del servidor, mostramos la imagen de error*/
        }
    }

    /*Enviamos la info al servidor, recuerda:
        - Se rellena si el método es POST
        - Se deja vacío si el método es GET
    Más info en https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/send*/
    xhr.send();
}