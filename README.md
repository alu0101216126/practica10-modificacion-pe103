# practica10-modificacion-pe103
## Daniel Álvarez Medina

En este repositorio se llevará acabo la modificación de la práctica 10

Para ejecutar abra dos terminales, primeramente en una deberá introducir `node dist/server.js`, para activar el servidor, y en el otro `node dist/client.js Ejemplo de mensaje`, que mandará un mensaje desde el cliente al servidor, se deberá sustituir "Ejemplo de mensaje" por el mensaje que se quiera almacenar.

El historial quedará almacenado dentro del fichero `history.txt` de la carpeta `src`.

Los tests se han ejecutado correctamente mediante el GitHub actions en 4 versiones de node distinas: `[10.x, 12.x, 14.x, 15.x]`
. Hemos empleado la clase EventEmitter para poder lanzar eventos a los manejadores, siguiendo el ejemplo de los apuntes de clase.
[![Tests](https://github.com/alu0101216126/practica10-modificacion-pe103/actions/workflows/node.js.yml/badge.svg)](https://github.com/alu0101216126/practica10-modificacion-pe103/actions/workflows/node.js.yml)
