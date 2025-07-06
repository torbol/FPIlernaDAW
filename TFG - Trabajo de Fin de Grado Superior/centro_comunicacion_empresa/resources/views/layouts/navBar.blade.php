<nav class="topnav">
    <div id="navLinks">
        <a class="active" href="/main">Inicio</a>
        @if ( Auth::user()->role === 'ADMIN')
            <a href="/userManager">Gestor de usuarios</a>
        @endif
    </div>
    
    <div id="loggedUser">
        <span><b>{{ '@'.Auth::user()->getUsername->username }}</b></span>
        <a href="/logout">Logout</a>
    </div>
</nav>