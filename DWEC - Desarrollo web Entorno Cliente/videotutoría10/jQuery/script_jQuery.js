//Manejador de eventos para que al pulsar botón realice solicitud a servidor
$("button").click(imageUpdater);

//Actualiza la imagen en la página según número aleatorio recibido del servidor
function imageUpdater() {
    /*Hacemos una petición get al servidor para que nos devuelva un valor aleatorio randomValue*/
    var request = $.ajax({
        url: "aleatorio.php",
        method: "GET",
        dataType: "html"
        });

        //Si la petición tiene éxito, se actualiza la imagen en la página según número aleatorio recibido del servidor
        request.done(function( msg ) {
        $("img").attr("src", "./img/" + msg + ".png");
        });
        
        /*En caso de fallo al obtener respuesta del servidor, mostramos la imagen de error*/
        request.fail(function( jqXHR, textStatus ) {
        $("img").attr("src", "./img/error.png");
        });
}