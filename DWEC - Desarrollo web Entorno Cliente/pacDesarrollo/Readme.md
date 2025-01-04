# Enunciado: PAC de Desarrollo
Desarrollar una aplicación web para jugar a Piedra, Papel o Tijera contra la máquina, con un historial de resultados.

### Tecnologías
- Solo se podrá modificar el archivo piedraPapelTijera.js utilizando el lenguaje JavaScript. Este archivo contendrá lo siguiente:

<p align="center">
  <img src="https://github.com/user-attachments/assets/30408ca9-1895-4bf1-a061-2390a6aa4db4" width=400>
</p>


- HTML y CSS proporcionados, no se pueden modificar ni utilizar otros ficheros.

<p align="center">
  <img src="https://github.com/user-attachments/assets/3f6252e7-e09a-4804-8183-9b7f48f7bab7" width=400>
</p>

### Objetivos

- **Principal**: Permitir jugar contra la máquina.
- **Específicos**:
  - Reconocimiento de usuarios y número de partidas.
  - Selección de opciones y generación de resultados. La selección de la máquina será aleatoria.
  - Control del historial y restablecimiento de partidas (reset).

### Requisitos
1. **Configuración de la aplicación**:
   - Asignar un evento al botón JUGAR para realizar las comprobaciones del comienzo de la partida.
   - Asignar un evento a todas las imágenes (excepto la última) para seleccionar la opción del jugador. Además generar las imágenes a partir del array posibilidades y añadir las rutas, el indicador de "Jugador" y la extensión del fichero.
   - Asignar un evento al botón YA para realizar la tirada y calcular el resultado.
   - Asignar un evento al botón RESET para restablecer la aplicación.
2. <span id="comienzoPartida">**Comienzo de partida**</span>:
   - Validar nombre y número de partidas. Un nombre será válido si tiene más de tres caracteres y el primero no es un número. La cantidad de partidas será válida si es mayor que 0. Al pulsar el botón JUGAR, comprobará si el nombre y el número de partidas son válidos, e indicará qué campos son incorrectos utilizando la clase "fondoRojo".
   - Si ambos campos son válidos, eliminará la clase "fondoRojo" en caso de haber metido previamente datos incorrectos y desactivará los campos de texto además de mostrar el número de tiradas en el \<span\> "total".
3. **Elección y tirada**:
   - Seleccionar opción del jugador, para ello:
     - Se aplicará la clase "seleccionado" y al resto "noSeleccionado"
   - Al pulsar el botón YA se generará una opción aleatoria para la máquina a partir del array "posibilidades", mostrando la imagen \<img\> (formando su ruta) dentro del \<div\> de la "máquina". También se sumará una partida en el \<span\> "actual" que indica cúantas partidas llevamos.
   - <span id="comprobarResultado">Comprobar resultado</span>, de forma que sea compatible con cualquier aplicación, siempre que el número de opciones que tenga el jugador corresponda con la longitud que tenga el array. Esto se puede hacer tendiendo en cuenta:
     - Lo que esté en la primera posición del array "posibilidades" (piedra) gana a lo que esté en la última (tijeras).
     - Lo que esté en la posición "n" del array gana a lo que está en la posición "n-1". Es decir, lo que está en la posición 2 (tijeras) gana lo que está en la posición 1 (papel), y así de forma sucesiva.
4. **Historial de partidas**:
   - Mostrar resultados de cada jugada:
     - Si el jugador gana, se indicará el nombre del jugador introducido al comienzo de la partida. Por ejemplo "Gana José Ángel".
     - Si gana la máquina, se mostrará el mensaje "Gana la máquina".
     - Y en caso de empate, el mensaje "Empate".
   - Restablecer aplicación con el botón RESET:
     - Nada más se pulse mostrará el mensaje "Nueva partida".
     - Volverá a activar los campos de texto bloqueados anteriormente, dejando a 0 las partidas introducidas y manteniendo el nombre del jugador.
     - Pondrá a 0 los contadores de partidas "actual" y "total".
     - Pondrá la imagen por defecto en la opción de la máquina (la del pingüino).
     - Mantendrá el historial de resultados hasta el momento.

### Pruebas
- Documento con capturas y comentarios del código para los siguientes casos:
  <ol type="1">
    <li>Usuario con datos no válidos.</li>
    <li>Cantidad de partidas no válida.</li>
    <li>Acceso con datos válidos.</li>
    <li>Jugar al menos 5 partidas.</li>
    <li>Pulsar RESET y jugar al menos 3 partidas.</li>
  </ol>

## Desarrollo del ejercicio:

A continuación voy a explicar tres puntos importantes de cara a cómo se ha resuelto el ejercicio, aunque el código se encuentra totalmente comentado paso a paso, voy a intentar de explicarlo desde un punto de vista más general.

### Clase Partida

Para la realización de este ejercicio se optó por una perspectiva enfocada a la programación orientada a objetos, para ello, se planteó un modelo en el que tendríamos una clase Partida, con los siguientes atributos por defecto:
```js
   jugadaJugador = posibilidades[0]; /*piedra*/
   jugadaMaquina = null;
   indiceJugadaJugador = 0;
   indiceJugadaMaquina = null;
   resultado = null;
  ```

De forma que se instancia en la variable **jugadas** un objeto de dicha clase y por cada partida que juguemos iremos modificando los atributos de este objeto por medio de sus métodos setters y getters. Así es más fácil ir actualizando los valores por cada partida y resulta en menos líneas de código resetear estos valores cuando presionemos el botón RESET.

<p align="center">
  <img src="https://github.com/user-attachments/assets/bd57dc47-203f-45f8-a37c-f5018e31c915">
</p>

### Validaciones de los campos de texto. Uso de RegEx:

Para realizar las validaciones que se nos pide en el [punto 2](#comienzoPartida) se ha utilizado la siguiente condición que devuelve *true* o *false* según la siguiente expresión regular:
 ```js
   let condicionesCampoNombre = (/^[^"&'<>0-9][^"&'<>]{3,}$/).test(campoNombre.value);
  ```
Vamos a analizarla por partes:

<p align="center">
  $${\color{green}/\wedge[\wedge"\&'<>0-9][\wedge"\&'<>]\{3,\}\$/}$$
</p>

<p>
  <ul>
    <li>$${\color{green}/\wedge}$$ → Indica el inicio del string (empezar por la izquierda).</li>
    <li>$${\color{green}[\wedge"\&'<>0-9]}$$  → Indicamos que el primer carácter no puede ser (negamos con el primer $${\color{green}\wedge}$$ dentro de los corchetes $${\color{green}[]}$$) ningún número $${\color{green}0-9}$$ ni caracteres reservados $${\color{green}"\&'<>}$$ que puedan romper el html.</li>
    <li>$${\color{green}[\wedge"\&'<>]\{3,\}\$/}$$ → Al igual que el anterior, negamos los caracteres especiales y con $${\color{green}\{3,\}}$$ decimos que se repita esa última condición al menos 3 veces más (indicando con la coma $${\color{green},}$$ el límite superior, que como está vacío significa que puede ir de 3 en adelante). Por último, con $${\color{green}\$/}$$ indicamos que es hasta el final del string</li>
  </ul>
</p>

### Lógica de la partida:

De acuerdo con el [punto 3](#comprobarResultado) la lógica de la jugada es la siguiente:

<p align="center">
  <img src="https://github.com/user-attachments/assets/3a2f568a-52a5-45f6-bcad-be32d2d8271b">
</p>

Donde la primera posición del array posibilidades (piedra) gana a la última (tijeras) y todas las posiciones intermedias n (en este caso tijeras) ganan a la posición inmediatamente anterior n-1 (papel).

## Resultado ejercicio:
<p align="center">
  <img src="https://github.com/user-attachments/assets/208e5569-7129-4207-8322-4b24c5a2c0de">
</p>

Aquí se siguen las pruebas que se solicitaban al princio, además todo el desarrollo del ejercicio se ha realizado teniendo en cuenta las puntuaciones más altas según la siguiente rúbrica (nota obtenida 10):

<table align="center">
  <tr>
    <th>Criterios</th>
    <th>Alta</th>
    <th>Media</th>
    <th>Baja</th>
    <th>Nada</th>
    <th>Peso</th>
  </tr>
  <tr>
    <td>Configuración de la aplicación: botones</td>
    <td>Se ha añadido correctamente el evento correspondiente al botón RESET</td>
    <td>Se ha añadido correctamente el evento correspondiente al botón ¡YA!</td>
    <td>Se ha añadido correctamente el evento correspondiente al botón ¡JUGAR!</td>
    <td>No cumplen los requisitos.</td>
    <td>0.5</td>
  </tr>
  <tr>
    <td>Configuración de la aplicación: opciones del jugador</td>
    <td>Se han añadido correctamente los eventos correspondientes a las opciones, y funciona independientemente del número de elementos que haya.</td>
    <td>-</td>
    <td>Se han añadido correctamente los eventos correspondientes a las opciones.</td>
    <td>No cumplen los requisitos.</td>
    <td>0.5</td>
  </tr>
  <tr>
    <td>Comienzo de partida</td>
    <td>Se cumplen todos los requisitos cuando se pulsa el botón ¡JUGAR!</td>
    <td>Se comprueba correctamente el nombre de usuario y su indicador de error.</td>
    <td>Se comprueba correctamente el número de tiradas y su indicador de error.</td>
    <td>No cumplen los requisitos.</td>
    <td>1</td>
  </tr>
  <tr>
    <td>Elección y tirada</td>
    <td>Se cumplen todos los requisitos cuando se pulsa el botón ¡YA!</td>
    <td>Se genera y muestra un valor aleatorio para la máquina.</td>
    <td>Se puede seleccionar una de las opciones teniendo en cuenta los requisitos de apariencia de la selección, a partir del array sin modificar.</td>
    <td>No cumplen los requisitos.</td>
    <td>1.5</td>
  </tr>
  <tr>
    <td>Historial de partidas</td>
    <td>Se cumplen todos los requisitos cuando se pulsa el botón RESET.</td>
    <td>Al pulsar el botón RESET, se muestra el mensaje.</td>
    <td>Cada vez que se pulsa el botón ¡YA! se muestra el resultado de la tirada.</td>
    <td>No cumplen los requisitos.</td>
    <td>1</td>
  </tr>
  <tr>
    <td>Pruebas</td>
    <td>Se incluyen todas las pruebas que se piden.</td>
    <td>Se incluyen bastantes de las pruebas que se piden.</td>
    <td>Se incluyen algunas de las pruebas que se piden.</td>
    <td>No se incluyen pruebas o están desorganizadas o no se ven correctamente o no incluyen todos los pasos que comprueben su superación.</td>
    <td>0.5</td>
  </tr>
</table>
