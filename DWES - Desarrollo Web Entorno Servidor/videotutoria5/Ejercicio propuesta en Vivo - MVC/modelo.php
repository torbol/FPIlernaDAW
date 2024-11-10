<?php
//IMPORTANTE, el modelo gestionará la lógica de negocio (cálculos con los datos) y el acceso a los datos. En este caso el input será UNA tarea tipo string y el output UN array clave-valor
//1. Establecemos el tiempo de expiración de un día para la cookie como variable global.
$tiempoExp = time() + (24*3600);

//2. Creamos los setters y getter
function getTareas() {
    $listaTareas = []; //Vamos a crear un array key-value en el que guardaremos nuestras tareas
    //Obtenemos las tareas guardadas en la cookie
    if(isset($_COOKIE["tareas"])) {
        $listaTareas = unserialize($_COOKIE["tareas"]); //Guardamos las tareas de la cookie en nuestro array, como lo guardamos serializando (serialize) el array (es decir convertir a string para guardar en cookie), en este caso lo tenemos que deserializar (unserialize) para usarlo como array en PHP otra vez
    }
    return $listaTareas; //Devolvemos nuestro array de tareas que había en la cookie
}

function setTarea($nuevaTarea) {
    $tareasAntiguas = getTareas(); //Recibo el array de la función de arriba
    $posicion = count($tareasAntiguas); //Obtenemos el length de nuestro array, recordemos que cuenta el número de elementos, de forma que el índice 0 es 1 elemento, el 1 es 2 elementos... de forma que nos da siempre el índice+1
    $tareasAntiguas[$posicion] = $nuevaTarea; //Añadimos al array nuestra nueva tarea
    //Guardamos en la cookie
    setcookie("tareas", serialize($tareasAntiguas), $GLOBALS["tiempoExp"]); //Volvemos a serializar, ya que en la cookie solo se pueden guardar Strings. Para ver ejemplos mirar este video https://www.youtube.com/watch?v=hTm4FyFDh40&t=86s&ab_channel=GaryClarke
    return $tareasAntiguas;
}