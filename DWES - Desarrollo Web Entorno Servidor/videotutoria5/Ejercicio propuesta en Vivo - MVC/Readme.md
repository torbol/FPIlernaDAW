# Ejercicio MVC (Modelo - Vista - Controlador): Propuesta en vivo

Crea un formulario de Listas de Tareas con un campo de texto para añadir una nueva tarea y un botón para Crear la Tarea. La lista de tareas se debe guardar en una cookie de un día de vida. Utiliza el patrón Modelo-Vista-Controlador.

* Las cookies no pueden ser array. Investiga las funciones serialize y unserialize.
* Para ser totalmente transparente al usuario, la vista no debe desaparecer de la pantalla del usuario. Investiga la función header.

## Explicación de cómo lo he planteado
Lo he realizado planteandolo como un modelo de 3 capas en el que según el patrón MVC:
* La vista será la interfaz gráfica.
* El controlador se encargará de hacer de intermediario ("traductor" inputs/outputs) entre la vista y el modelo. También generará la lista de tareas con los datos que obtenga del modelo.
* El modelo gestionará el acceso a datos. Estableciendo, guardando y recuperando las tareas de la cookie.

El ejercicio ha seguido este diagrama:
<p align="center">
  <img src="https://github.com/user-attachments/assets/cad55a6f-c9bc-4c6e-b686-6eeda5f6304b" width="720">
</p>

### Vista
Incluimos el controlador y llamamos a la función ***generarLista()***:
<p align="center">
  <img src="https://github.com/user-attachments/assets/eecbe718-0040-4c21-a5fd-ba3c76f0fc70">
</p>

### Controlador
Aquí lo que se hace es, definir e implementar la función anterior. Sabemos que ***generarLista()*** va a tener un input que será un array obtenido desde el controlador al llamar a ***getTareas()***, el cual será nuestra lista de tareas y por eso se recorrerá con un foreach:
<p align="center">
  <img src="https://github.com/user-attachments/assets/036d333d-bf4d-4e20-98a4-a5683d803f2f"><br>
  <img src="https://github.com/user-attachments/assets/4a799f1a-e3c7-41ce-8cbe-89df7a61626c" width="600">
</p>

También comprueba que estamos recibiendo un input text correcto desde el formulario (y que no está vacío):
<p align="center">
  <img src="https://github.com/user-attachments/assets/3cc1847a-7556-4bc6-aefe-de362cb2915c">
</p>

Y con la función ***header()*** indicamos que nuestro controlador nos redirija siempre a la vista "index.php", siguiendo este flujo:
<p align="center">
  <img src="https://github.com/user-attachments/assets/460e4a93-b0fe-4aee-998e-5ee39609e3d6" width="720">
</p>

### Modelo
Establecemos las dos funciones, ***getTareas()*** que leerá de la cookie las tareas que habíamos guardado previamente:
<p align="center">
  <img src="https://github.com/user-attachments/assets/235ba19c-e188-45a7-b4ce-5a7a8555155e">
</p>

Y ***setTarea()*** con la que guardaremos en la cookie nuestra nueva tarea:
<p align="center">
  <img src="https://github.com/user-attachments/assets/8e76cc15-c7ea-4dea-9de7-446ee53cec70">
</p>

Vemos que el tiempo de expiración de la cookie se ha establecido como una variable global (al principio del fichero modelo.php) para facilidad de posterior modificación, por lo que para acceder a ella desde la función setTarea() se utiliza ***$GLOBALS["tiempoExp"]*** que está establecido en 1 día.

## Resultado ejercicio:
<p align="center">
  <img src="https://github.com/user-attachments/assets/f975c254-73cd-4b4b-bb0b-31149784a22d" width="720">
</p>
