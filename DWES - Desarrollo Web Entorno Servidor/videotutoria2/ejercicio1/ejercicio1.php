<!DOCTYPE html>
<html lang="es">
    <head>
        <meta charset="utf-8">
        <title>Ejercicio 1</title>
    </head>
    <body>
        <?php
            //Se usarán valores de ejemplo para las variables, sustituir por los originales.
            $nombre = "José";
            $apellidos = "Ángel";
            $fecha_nacimiento = "día-mes-año";
            $foto = "foto.png";
            $ultimos_estudios = "Universidad";
            $carrera = "Ingeniería";
            $centro = "Universidad";
            $ultima_experiencia_laboral = "Puesto de ejemplo";
            $empresa = "Empresa de Ejemplo";
        ?>

        <div>
            <img src="<?php echo $foto; ?>" alt="Foto personal" width="200" height="200">
            <h1><u>Datos personales</u></h1>
            <p><b>Nombre: </b><?php echo $nombre; ?></p>
            <p><b>Apellidos: </b><?php echo $apellidos; ?></p>
            <p><b>Fecha de nacimiento: </b><?php echo $fecha_nacimiento; ?></p>
        </div>
        <div>
            <h1><u>Estudios</u></h1>
            <p><b>Últimos estudios: </b><?php echo $ultimos_estudios ; ?></p>
            <p><b>Carrera: </b><?php echo $carrera; ?></p>
            <p><b>Centro: </b><?php echo $centro; ?></p>
        </div>
            <h1><u>Experiencia laboral</u></h1>
            <p><b>Última experiencia laboral: </b> <?php echo $ultima_experiencia_laboral; ?></p>
            <p><b>Empresa: </b> <?php echo $empresa; ?> </p>
        <div
    </body>

</html>