<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login</title>
</head>
<body>
    <form action="{{ route('login.login') }}" method="POST">
        @csrf <!--Provide us a token to avoid certain types of attacks.-->
        <label for="username">Nombre de usuario:</label><br>
        <input type="text" name="username"><br>
        <label for="password">Contraseña:</label><br>
        <input type="password" name="password">
        <label for="submit"></label>
        <input type="submit" value="Iniciar sesión">
    </form>

</body>
</html>