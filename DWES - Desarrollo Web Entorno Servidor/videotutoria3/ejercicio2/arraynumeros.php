<!DOCTYPE html>
<html lang="es">
    <head>
        <title>Ejercicio 2</title>
        <meta charset="utf-8">
    </head>
    <body>
        <?php
            //Incluimos nuestro fichero de funciones.php
            include("funciones.php");
            //Creamos nuestro array de números
            $arrayNumeros = [53,66,71,46,22,85,19,67,77,41,60];

            //Hacemos una pequeña función para mostrar nuestros arrays que pasemos por parámetro, aunque esto se podría hacer más sencillo usando la función print_r($arrayNumeros)
            function mostrarArray($nuestroArray)
            {
                $stringConcatenado = "";
                for ($i = 0; $i < count($nuestroArray); $i++) {
                    if ($i != count($nuestroArray)-1) { //Con el if estamos diciendo que añada una coma después del número, desde la posición 0 hasta la penúltima posición del array
                        $stringConcatenado = $stringConcatenado.$nuestroArray[$i].", ";
                    }
                    else { //Con este else NO añadimos la coma después del último número del array
                        $stringConcatenado = $stringConcatenado.$nuestroArray[$i];
                    }
                }
                return "[".$stringConcatenado."]"; //Devolvemos el array como un string tipo $stringConcatenado = "[53, 66, 71, 46, 22, 85, 19, 67, 77, 41, 60]"
            }
        ?>
        <!--Ahora Desarrollamos el código de nuestra página-->
        <p><b>Nuestro array de entrada es:</b>
            <?php
                echo mostrarArray($arrayNumeros); //Mostramos nuestro array de entrada
            ?>
        </p>
        <p>
            <br>El mayor valor es: <?php echo mayorValor($arrayNumeros); ?>
            <br>El menor valor es: <?php echo menorValor($arrayNumeros); ?>
            <br>La suma de todos los valores es: <?php echo sumaValores($arrayNumeros); ?>
            <br>Hay <?php echo numerosPares($arrayNumeros)[0]; ?> números pares y son <?php echo mostrarArray(numerosPares($arrayNumeros)[1]); ?> <!--Recuerda la función numerosPares de funciones.php nos devuelve un array del tipo [recuento, arrayDeNumerosPares]-->
        </p>
    </body>

</html>