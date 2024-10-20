<!Doctype html>
<html lang="es">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <!--
         El viewport es el área visible por el usuario de una página web, esto varía con el tamaño de pantalla de cada dispositivo,
         en este caso se establece con la etiqueta meta que el content se ajuste al ancho de la pantalla del dispositivo y
         que la escala inicial de zoom sea de 1.0
         Puedes ver más info en esta página: https://www.w3schools.com/css/css_rwd_viewport.asp
        -->
        <title>Formulario</title>
        <link rel="stylesheet" href="css/style.css">
    </head>
    <body>
        <div class="div1">
            <h1>¿Qué desea tomar?</h1>
            <div class="div2">
                <form method="GET" action="comanda.php" id="formulario">
                    <div class = "primerplato">
                        <h2>Primer plato</h2>
                        <label for = "plato1"></label>
                        <select name="plato1">
                            <option value="Tortilla de patatas">Tortilla de patatas</option>
                            <option value="Fabada Asturiana">Fabada Asturiana</option>
                            <option value="Ensalada de la casa">Ensalada de la casa</option>
                        </select>
                    </div>
                    <div class = "segundoplato">
                        <h2>Segundo plato</h2>
                        <label for = "plato2"></label>
                        <select name="plato2">
                            <option value="Costillas a la barbacoa">Costillas a la barbacoa</option>
                            <option value="Hamburguesa de Black Angus">Hamburguesa de Black Angus</option>
                            <option value="Lubina">Lubina al horno</option>
                        </select>
                    </div>
                    <div class = "bebida">
                        <h2>Bebida</h2>
                        <label for = "beber"></label>
                        <select name="beber">
                            <option value="Botella de agua">Botella de agua</option>
                            <option value="Cerveza">Cerveza</option>
                            <option value="CocaCola Zero">CocaCola Zero</option>
                            <option value="Fanta Zero">Fanta Zero</option>
                        </select>
                    </div>
                    <div class = "postre">
                        <h2>Postre</h2>
                        <label for = "plato3"></label>
                        <select name="plato3">
                            <option value="Tarta de queso">Tarta de queso</option>
                            <option value="Tarta de la abuela">Tarta de la abuela</option>
                            <option value="Coulant de chocolate">Coulant de chocolate</option>
                            <option value="Arroz con leche casero">Arroz con leche casero</option>
                        </select>
                    </div>
                </form>
            </div>
            <div class = "botones">
                <button type="submit" value="Enviar" form="formulario">Enviar</button>
            </div>
        </div>
    </body>
</html>