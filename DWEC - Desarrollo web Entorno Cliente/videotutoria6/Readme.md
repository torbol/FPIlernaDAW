# Ejercicio repaso: Creación de una lista de tareas en JavaScript

## Enunciado

* <b>Paso 1: Crear una Clase de Tareas.</b><br>
Crea una clase llamada Tarea que tenga los siguientes atributos: id, descripcion y completada. La descripción es una cadena de texto que 
representa la tarea. El ID es un número que identifica de manera única cada tarea. El valor inicial de completada debe ser false.

* <b>Paso 2: Crear un Array de Tareas</b><br>
Crea un array llamado listaDeTareas y agrega al menos tres objetos de la clase Tarea a la lista. Estas tareas pueden ser ficticias, pero 
asegúrate de que cada objeto tenga una descripción diferente.

* <b>Paso 3: Crear una Función para Mostrar Tareas</b><br>
Escribe una función llamada mostrarTareas  que muestre en la pantalla la lista de tareas cada una con sus botones para poder eliminar y 
marcar como completada la tarea.

* <b>Paso 4: Crear una Función para Agregar Tareas</b><br>
Escribe una función llamada agregarTarea que tome una descripción como argumento y cree una nueva instancia de la clase Tarea. Luego, agrega esta nueva tarea al array listaDeTareas.

* <b>Paso 5: Crear una Función para Marcar Tareas como Completadas</b><br>
Escribe una función llamada marcarTareaComoCompletada que tome un ID como argumento y marque la tarea correspondiente como 
completada (cambia el valor de completada a true).

* <b>Paso 6: Crear una Función para Eliminar Tareas</b><br>
Escribe una función llamada eliminarTarea que tome un ID como argumento y elimine la tarea correspondiente del array listaDeTareas.

* <b>Paso 7:  Añadir fecha a la tarea y generar recordatorios de fechas de vencimiento</b><br>
Puedes marcar con distintos colores las tareas dependiendo de si la fecha de vencimiento es 
próxima o no. Por ejemplo:
  * Amarillo: faltan 7 días
  * Naranja: faltan 3 días
  * Rojo: se ha pasado la fecha o es ese mismo día

* <b>Paso 8:  Mostrar las tareas completadas</b><br>
 Crear un botón que al pulsar solo muestre aquellas tareas con el campo “completada” a true.

* <b>Paso 9: Mostrar las tareas pendientes</b><br>
Crear un botón que al pulsar solo muestre aquellas tareas con el campo “completada” a false.

* <b>Paso 10: Confirmación de eliminación</b><br>
Agregar una confirmación antes de eliminar una tarea. Esto evitará la eliminación accidental de tareas importantes.

## Nota breve y desarrollo
> [!NOTE]  
> ***Todo el código de "lista.js" se encuentra documentado, por lo que no es necesario leer este documento, sin embargo, la explicación que se da en este documento es desde una perspectiva más global.***

### Nos dan el siguiente html y CSS:

<p align="center">
  <img src="https://github.com/user-attachments/assets/450f74dc-cedd-43b6-99cc-495ed83fe72c" width=720>
</p>

<p align="center">
  <img src="https://github.com/user-attachments/assets/a1165d79-83b6-4fda-ae17-9b926f435efa" width=600>
</p>

### Cómo se ha llevado a cabo:
En este caso se ha desarrollado todo el código JavaScript partiendo de cero, ya que he querido darle un enfoque distinto a la solución de la profesora. A diferencia de la solución propuesta, en mi caso tal y como se indicó a principio de curso, no he querido tocar para nada ni el HTML ni el CSS originales. Toda funcionalidad, elemento o estilo extra añadido se ha realizado con el JavaScript.

Se han tenido en cuenta las siguientes <b>mejoras</b>:

* <b>Paso 1: Crear una Clase de Tareas.</b><br>
  * Se añaden los tres atributos que se nos piden (id, tarea y completada = false), además de un cuarto atributo solicitado en paso 7 (fechaVencimiento):
    <p align="center">
      <img src="https://github.com/user-attachments/assets/fd4727a5-54b9-415a-9aa9-98b97dd3ae9a" width=850>
    </p>

* <b>Paso 2: Crear un Array de Tareas</b><br>
  * Además de crear el array con id y tarea, añadimos la fecha sumándole los días de expiración de acuerdo con punto 7:
    <p align="center">
      <img src="https://github.com/user-attachments/assets/01a69cd4-c540-422a-81c0-718af9dc0144" width=850>
    </p>

* <b>Paso 3: Función para Mostrar Tareas</b><br>
  * Acepta un parámatro (estado) que puede tomar el valor de true o false, para responder a los pasos 8 y 9, si es true, mostrará solo las tareas completadas y si es false, las que estén pendientes, si en cambio llamamos a la función sin pasar ningún parámetro, este será undefined y mostrará la lista completa de tareas (completadas y no completadas)
  * Se ha incluido una función crearLista() para organizar un poco el código dentro de esta función y que sea más fácil implementar pasos 8 y 9.
  * Se incorporan estilos a cada elemento de la lista nueva para cambiar color de fondo según fecha restante (paso 7)
  * Además se añade a la lista \<ul\> la posibilidad de hacer scroll con overflow "auto" si esta es demasiado larga, así siempre podremos ver las tareas sin que se pierdan. *(ESTO NO ES UN REQUISITO)*
    <p align="center">
      <img src="https://github.com/user-attachments/assets/3ed21db7-ae89-4c5e-bf38-5a8a0791a3b4" width=850>
    </p>

* <b>Paso 4: Función para Agregar Tareas</b><br>
  * Se han añadido controles a nivel cliente para que se introduzcan valores válidos en el campo de texto (al menos una letra). Además se hace un reemplazo de caracteres especiales ("<", ">", "&"...) que podrían dañar la estructura html al ser insertados, por su código de entidad. Para esto se hace uso de Expresiones Regulares (conocidas como regex o regexp).
  * También se comprueba que se haya introducido una fecha válida (paso 7) para añadir la tarea.
    <p align="center">
      <img src="https://github.com/user-attachments/assets/8b016727-239b-4f1d-a3f3-01008bb69482" width=850>
    </p>

* <b>Paso 5: Función para Marcar Tareas como Completadas</b><br>
  * Pasamos el id de la tarea como parámetro de la función y la localizamos con la función find(), luego cambiamos el atributo tarea.completada = true;
    <p align="center">
      <img src="https://github.com/user-attachments/assets/5f0bed64-26ea-45a5-9226-b899a522749e" width=850>
    </p>

* <b>Paso 6: Función Eliminar Tareas</b><br>
  * Buscamos por id de la tarea (pasado como parámetro), con findIndex encontramos el índice en el array listaDeTareas de la tarea que contiene ese id y eliminamos el contenido de esa posición. Además recorremos con un bucle for el resto de tareas (desde la de la posición que acabamos de eliminar, hasta el final del array) y actualizamos el atributo id para que las tareas restantes siempre queden ordenadas (1, 2, 3...)
    <p align="center">
      <img src="https://github.com/user-attachments/assets/c854519f-035a-488f-8691-07b6cf735913" width=850>
    </p>

* <b>Paso 7:  Añadir fecha a la tarea y generar recordatorios de fechas de vencimiento</b><br>
  * Se añade el cajón para las fechas insertándole los mismos estilos que para *#descripcion-tarea* (como en el CSS):
    <p align="center">
      <img src="https://github.com/user-attachments/assets/f8a2c7e3-acf7-4aca-8f48-dd7edf9b996c" width=850>
    </p>
  * La lógica sobre los días restantes y el color de fondo se realiza en la función mostrarTareas(), (mirar foto completa en paso 3)
    <p align="center">
      <img src="https://github.com/user-attachments/assets/43b703d4-309a-45bf-8e67-349973b0767d" width=850>
    </p>
  * Se verifica fecha como mencionamos en el paso 4:
    <p align="center">
      <img src="https://github.com/user-attachments/assets/cee0bafd-cc1f-49b1-918e-284d463ddd85" width=850>
    </p>
  * Añadimos dos constantes, una que será la fecha actual y otra que la utilizaremos para establecer las fechas nuevas con setDate() tal y como se ve en el paso 2:
    <p align="center">
      <img src="https://github.com/user-attachments/assets/28f969bf-87d5-4dbb-ae3d-d7d5ee3b5d39" width=850>
    </p>
  * Añadimos el cuarto atributo a nuestra clase tal y como mencionamos en el paso 1:
    <p align="center">
      <img src="https://github.com/user-attachments/assets/02ad5625-d53b-4f15-ac21-142d4beae796" width=850>
    </p>
    
* <b>Paso 8 y 9:  Mostrar las tareas completadas y pendientes</b><br>
  * Creamos una función crearBoton("función que irá dentro del onclick", "texto del botón") que insertará los botones al final del último botón del body en el html. Y también implementamos las funciones mostrarCompletadas() y mostrarPendientes():
    <p align="center">
      <img src="https://github.com/user-attachments/assets/4d8771ef-9a53-4611-b566-ad332c972d36" width=850>
    </p>

* <b>Paso 10: Confirmación de eliminación</b><br>
  * Tal y como se menciona en el paso 6, se incluye en la función eliminarTarea() la confirmación de eliminación:
    <p align="center">
      <img src="https://github.com/user-attachments/assets/5097065c-618c-4afc-808e-3b5d907f4a3e" width=850>
    </p>

## Resultado ejercicio:
https://github.com/user-attachments/assets/50c41218-81b6-492f-be6d-96c3ab1ed050

