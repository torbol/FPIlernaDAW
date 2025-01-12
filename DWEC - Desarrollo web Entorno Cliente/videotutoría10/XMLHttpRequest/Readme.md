# AJAX con objeto XMLHttpRequest

## Enunciado
### Descripción:
La aplicación mostrará imágenes numeradas del 1 al 5 al hacer clic en un botón, consultará al servidor para obtener un
número aleatorio y mostrará la imagen correspondiente en función del número recibido.
### Pasos a seguir:
<ol>
  <li>Archivos: <b>index.html</b>, <b>script.js</b>, y <b>aleatorio.php.</b>
  <ol>
    <li>En el archivo <ins>index.html</ins>, define la estructura básica del documento HTML que incluya un elemento de imagen y un botón.</li>
    <li>En el archivo <ins>script.js</ins>, implementa el código JavaScript necesario para:
    <ol>
      <li>Obtener una referencia al elemento de imagen y al botón.</li>
      <li>Agregar un manejador de eventos al botón para realizar una solicitud al servidor cuando se hace clic.</li>
      <li>Actualizar la imagen en la página según el número aleatorio recibido del servidor.</li>
    </ol>
    </li>
    <li>En el archivo <ins>aleatorio.php</ins>, implementa la lógica para generar y devolver un número aleatorio entre 1 y 5 cada vez que recibe una solicitud.</li>
  </ol>
  </li>
  <li>Carpeta llamada "img" que contenga imágenes numeradas del 1 al 5 en formato PNG.</li>
  <li>Ejecuta la aplicación en un servidor web y verifica que al hacer clic en el botón, la imagen cambie de acuerdo al número aleatorio obtenido del servidor.</li>
</ol>

## Resultado:
Este ejercicio ha sido resuelto utilizando Vanilla JS, implementando una comunicación asíncrona cliente-servidor por medio del objeto XMLHttpRequest. Todas las explicaciones se encuentran en el código del archivo [script.js](script.js)

![resultado](https://github.com/user-attachments/assets/8dcf3176-9a71-4a9c-b301-3def153ca5fc)


