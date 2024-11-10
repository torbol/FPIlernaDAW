<?php
//Incluimos el modelo en el controlador. El controlador se encarga de la comunicación entre Vista y Modelo
include_once ("modelo.php");

function generarLista() {
    //Con esta función vamos a generar la lista con las tareas que obtengamos del modelo, por tanto, necesitamos establecer las funciones setters y getters en nuestro modelo
    $tareasGuardadas = getTareas(); //Obtenemos las tareas guardadas en la cookie y lo metemos en la variable $tareasGuardadas
    foreach ($tareasGuardadas as $tarea) {
        echo "<li>".$tarea."</li>";
    }

}

//Vemos si se ha pasado algún parámetro con valor tarea desde el formulario
if(isset($_GET['tarea'])) {
    //Comprobamos si se ha enviado en el formulario alguna nueva tarea, para añadirla
    if(!empty($_GET['tarea'])) { //Si el cuadro de texto no está vacío, pasamos la nueva tarea al modelo para guardarla.
        $tareasGuardadas = setTarea($_GET['tarea']);
    }
    header("location: index.php"); // Hacemos que se muestre siempre la vista
}




