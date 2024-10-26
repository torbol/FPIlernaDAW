<?php include('config.php') //Fichero que establece pais del servidor para fechas ?>
<!DOCTYPE html>
<html lang="es">
    <head>
        <meta charset="utf-8">
        <title>Tiempo UNIX</title>
    </head>
    <body>
        <?php
            $valorFechaUnix = mktime((int)$_POST['hour'], (int)$_POST['minutes'], (int)$_POST['seconds'], (int)$_POST['month'], (int)$_POST['day'], (int)$_POST['year']); //Se guarda cadena con fecha date a partir valores del formulario usando mktime(hour, minute, second, month, day, year)
            echo "El ".strftime("%A", $valorFechaUnix)." ".strftime("%d", $valorFechaUnix)." de ".strftime("%B", $valorFechaUnix)." de ".strftime("%Y",$valorFechaUnix)." a las ".strftime("%H", $valorFechaUnix).":".strftime("%M", $valorFechaUnix).":".strftime("%S", $valorFechaUnix)." tiene un valor UNIX de ".$valorFechaUnix; //Importante, a diferencia de date() que siempre devuelve en inglés, con strftime() los meses y días se devolverán en idioma establecido por setlocale()
        ?>
    </body>
</html>