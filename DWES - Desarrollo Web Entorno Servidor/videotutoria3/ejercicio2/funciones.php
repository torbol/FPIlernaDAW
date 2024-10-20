<?php
    //Se incluyen todas las funciones que se usarán en arraynumeros.php. IMPORTANTE la colección de números irá desde menos infinito hasta infinito
    function mayorValor($arrayNumeros)
    {
        //Primero tenemos que recorrer el array con un foreach guardando cada elemento en una variable $numero
        $numeroAnterior = $arrayNumeros[0]; //Aquí guardaremos el número más alto, partiendo del primer número (primera posición)
        for ($i = 0; $i < count($arrayNumeros); $i++) {
            if ($arrayNumeros[$i] > $numeroAnterior) {
                $numeroAnterior = $arrayNumeros[$i]; //Guardamos el número más alto en la variable $numeroAnterior
            }
        }
        return $numeroAnterior; //Devolvemos el número más alto del array
    }

    function menorValor($arrayNumeros)
    {
        //Recorremos el array con foreach
        $numeroAnterior = $arrayNumeros[0]; //Aquí guardaremos el número más bajo, partiendo del primer número (primera posición)
        for ($i = 0; $i < count($arrayNumeros); $i++) {
            if ($arrayNumeros[$i] < $numeroAnterior) {
                $numeroAnterior = $arrayNumeros[$i]; //Guardamos el número más bajo en la variable $numeroAnterior
            }
        }
        return $numeroAnterior; //Devolvemos el número más bajo del array
    }

    function sumaValores($arrayNumeros)
    {
        //Creamos una variable donde guardaremos la suma acumulada
        $sumaAcumulada = 0;
        //Recorremos el array con un foreach y vamos sumando en la variable anterior cada nuevo número
        foreach ($arrayNumeros as $numero) {
            $sumaAcumulada += $numero;
        }
        return $sumaAcumulada; //Devolvemos la suma de los elementos del array
    }

    function numerosPares($arrayNumeros)
    {
        //Recorremos el array
        $arrayPares = []; //Creamos un array donde iremos guardando nuestros números pares
        $indiceArrayPares = 0; //Esto es un incrementador para ir guardando el número en nuestros array de números pares
        foreach ($arrayNumeros as $numero) {
            //Son pares todos los números divisibles entre 2 y cuyo resto sea 0
            if ($numero % 2 == 0) {
                /*Solo especifica cúantos de esos números, pero ante la duda vamos a devolver
                también un array con los números que son pares y con lenth sabríamos cúantos
                números pares tenemos en nuestro array*/
                $arrayPares[$indiceArrayPares] = $numero;
                //Incrementamos nuestro índice para que el próximo número par se guarde en la segunda posición (posición 1) de $arrayPares
                $indiceArrayPares++;
            }
        }
        return [count($arrayPares), $arrayPares]; //Esto nos devolverá el recuento de números que son pares y los números en un array de la forma [recuento, arrayDeNumerosPares]
    }
?>