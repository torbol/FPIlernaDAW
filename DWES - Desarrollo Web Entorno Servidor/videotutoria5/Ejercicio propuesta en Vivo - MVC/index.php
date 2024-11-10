<!DOCTYPE html>
<html lang="es">
    <head>
        <meta charset="utf-8">
        <title>Ejercicio 5</title>
    </head>
    <body>
        <ol>
            <?php
            // Insertamos al html la lista actualizada con la nueva tarea
            include_once("controlador.php"); // Incluimos en la Vista el Controlador
            generarLista();
            ?>
        </ol>
        <form method="GET" action="controlador.php">

            <label for="tarea"> Nueva tarea</label>
            <input type="text" id="tarea" name="tarea">
            <input type="submit" value="Crear">
        </form>
    </body>
</html>