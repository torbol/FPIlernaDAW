<?php
    //Iniciamos nueva sesión en el servidor, si ya existe, se mantiene la anterior
    session_start();
    // Creamos la variable de sesión, para ello comprobamos si está definida y en caso de que no, definimos e inicializamos a 1
    $contador = "valorContador";
    (isset($_SESSION[$contador])) ? $_SESSION[$contador]++ : $_SESSION[$contador] = 1;

    //Cuando contador sea 10, se destruye la sesión y se tendrá que volver a empezar
    if ($_SESSION[$contador] == 10)
        session_destroy();
?>

<!DOCTYPE html>
<html lang="es">
    <head>
        <meta charset="utf-8">
        <title>Ejercicio 5A</title>
    </head>
    <body>
        <h1>El valor del contador de visitas es de <?php echo $_SESSION[$contador]; ?></h1>
    </body>


</html>