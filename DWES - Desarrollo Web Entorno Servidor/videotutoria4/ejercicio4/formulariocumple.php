<?php include('config.php') //Fichero que establece pais del servidor para fechas ?>
<!DOCTYPE html>
<html lang="es">
    <head>
        <meta charset="utf-8">
        <title>Ejercicio 4</title>
    </head>

    <body>
        <h1>Introduce una fecha:</h1>
        <form action="recibedatos.php" method="post" name="formulario">
            <fieldset>
                <!--Campo para el día-->
                <label for="day">Día: </label>
                <input type="number" name="day" min="1" max="31" step="1"><br> <!--Día debe ir entre 1 y 31-->
                <!--Seleccionable para el mes donde aparezca en inglés meses enero a diciembre-->
                <label for="month">Mes: </label>
                <?php

                    $months = ""; //Concatenaremos los meses en una estructura <option></option>
                    for ($i = 1; $i <= 12; $i++) {
                       $months = $months.'<option value="'.$i.'">'.date("F", mktime(0,0,0,$i,1,0)).'</option>'; //IMPORTANTE: Cuando le pasamos el día 0 a la función mktime(), php interpreta que es el último día del mes anterior. Por lo que si pasamos mktime(0, 0, 0, $i, 0, 0) estaría generando una fecha para inmediatamente el día anterior al mes del bucle, así que para que los meses del 1 al 12 vayan desde Enero a Diciembre, debemos establecer el día 1. También es importante recalcar que la función date() devuelve los días y meses solo en texto Inglés
                    }
                    echo '<select name="month">'.$months.'</select><br>'; //Metemos los meses dentro del select: <select><option>Enero</option><option>Febrero</option>...</select>
                ?>
                <!--Campo para el año-->
                <label for="year">Año: </label>
                <input type="number" name="year" min="1900" max="2037" step="1"><br> <!--Se establece como año máximo 2037 ya que el 19 de enero de 2038 (timestamp 2,147,483,647) se producirá un desbordamiento aritmético para enteros de 32 bits (números entre -2 147 483 648 y 2 147 483 647), justo el tipo de la variable que recoge por parámetros el valor pasado en la función date(int $timestamp = time()), siendo time(): int. Para más info: https://es.wikipedia.org/wiki/Problema_del_a%C3%B1o_2038-->
                <!--Tres campos para la hora, minutos y segundos-->
                <label for="hour">Hora: </label>
                <input type="number" name="hour" min="0" max="23" step="1">
                <label for="minutes">Minutos: </label>
                <input type="number" name="minutes" min="0" max="59" step="1">
                <label for="seconds">Segundos: </label>
                <input type="number" name="seconds" min="0" max="59" step="1"><br>
                <!--Botón convertir que envíe to\do el formulario-->
                <input type="submit" value="Enviar">
            </fieldset>
        </form>
    </body>

</html>