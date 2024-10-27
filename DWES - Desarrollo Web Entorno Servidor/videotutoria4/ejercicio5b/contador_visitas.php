<?php
    $counterKey = 'valorContador'; //Nombre clave para el contador
    $expirationKey = 'expirationTime'; //Nombre clave para fecha de expiración
    $tiempoDias = 30; //Ciclo de vida cookies en días
    $expirationValue = time() + ($tiempoDias*24*60*60); //Valor tiempo caducidad de ambas cookies en segundos
    $nmin = 1; //Contamos del 1 al 10
    $nmax = 10;

    //Creamos una función para incrementar contador y que devuelva valor de este, si es 10 reinicia
    function controlValorContador($contador_f, $nmin_f, $nmax_f)
    {
        if ($contador_f < $nmax_f) {
            $contador_f++; //Cuando $contador es menor a 10, aumentamos 1 el valor de la cookie
        } else {
            $contador_f = $nmin_f;

        }
        return $contador_f; //Devolvemos valor contador
    }

    //Comprobamos si ya están establecidas las cookies, en caso contrario las creamos
    if (!isset($_COOKIE[$expirationKey]) || !isset($_COOKIE[$counterKey])) {
        setcookie($expirationKey, $expirationValue, $expirationValue); //Guardamos tiempo de expiración de las cookies en segundos en una cookie, para que siempre sea mismo valor
        setcookie($counterKey, $nmin, $expirationValue); //Establecemos contador al mismo tiempo de expiración
        $updatedValue = $nmin;
    } else {
        $updatedValue = controlValorContador($_COOKIE[$counterKey], $nmin, $nmax); //Guardamos valor incrementado/reiniciado
        setcookie($counterKey, $updatedValue, $_COOKIE[$expirationKey]); //Actualizamos valor en nuestra cookie
    }
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="utf-8">
    <title>Ejercicio 5B</title>
</head>
<body>
<h1>El valor del contador de visitas es de <?php echo $updatedValue; ?></h1>
</body>


</html>