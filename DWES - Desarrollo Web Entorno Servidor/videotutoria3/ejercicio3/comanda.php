<!DOCTYPE html>
<html lang="es">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1"> <!--Mirar explicación etiqueta en formulario.php-->
        <title>comanda 2</title>
        <link rel="stylesheet" href="css/style.css">
    </head>
    <body>
        <table class="tabla">
            <tr>
                <th>Mesa</th>
                <th>Primer plato</th>
                <th>Segundo plato</th>
                <th>Postre</th>
                <th>Bebida</th>
            </tr>
            <tr>
                <td>1</td>
                <td><?php echo $_GET["plato1"]; ?></td>
                <td><?php echo $_GET["plato2"]; ?></td>
                <td><?php echo $_GET["plato3"]; ?></td>
                <td><?php echo $_GET["beber"]; ?></td>
            </tr>
        </table>
    </body>
</html>