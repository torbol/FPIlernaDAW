<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>Gestor de Usuarios</title>
    <link rel="stylesheet" href="{{ asset('css/style.css') }}">
    
</head>
<body>
    @include('layouts.navBar')
    <div id="userManagerOptions">
        <h1>Seleccione la opción a realizar:</h1>
        <div>
            <button type="button">Crear</button>
            <button type="button">Editar</button>
            <button type="button">Eliminar</button>
        </div>
    </div>

    <div id="divUserSelector" hidden>
        <form action="" id="selectorForm" method="post">
            @csrf
            <label for="id">Elige un usuario: </label>
            <select name="id" id="userSelector">
                @foreach ($users as $user)
                    @if ($user->name !== null)
                        <option value="{{ $user->id }}">{{ $user->getUsername->username }}</option>
                    @endif
                @endforeach
            </select><br>
        </form>
    </div>
    
    <div id="form">
        
    </div>

    <div id="errorsDiv">
        @foreach ($errors->all() as $message)
            <p>{{ $message }}</p>
        @endforeach
    </div>

    <script type="module" src="{{ asset('js/users/userManager.js') }}"></script>
</body>
</html>