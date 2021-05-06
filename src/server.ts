/* eslint-disable brace-style */
/**
 * Para ejecutar abra dos terminales, primeramente en una deberá introducir `node dist/server.js`, para activar el servidor,
 * y en el otro `node dist/client.js Ejemplo de mensaje`, que mandará un mensaje desde el cliente al servidor,
 * se deberá sustituir "Ejemplo de mensaje" por el mensaje que se quiera almacenar.
 * El historial quedará almacenado dentro del fichero history.txt de la carpeta `src`.
 */

import * as fs from 'fs';
import * as net from 'net';

// Mediante createServer creamos un objeto Server, y mediante {allowHalfOpen: true}
// el socket no terminará automáticamente el lado de escritura cuando termine el lado de lectura
const server = net.createServer({allowHalfOpen: true}, (connection) => {
  let wholeData = '';

  // Indicamos que se ha establecido la conexión
  console.log('A client has connected.');
  connection.on('data', (chunk) => {wholeData += chunk;});

  // Con el evento end, significa que el cliente ya envió el mensaje, por lo que ya podemos utilizar lo recibido en data
  connection.on('end', () => {
    // Parseamos JSON el mensaje recibido
    const request = JSON.parse(wholeData);

    console.log('Message obtained from client');

    fs.appendFile('src/history.txt', request.text + '\n', (err) => {
      if (err) {
        connection.write(JSON.stringify({'type': 'error'}), (err) => { // Si el type es de error
          if (err) console.log(`Request could not be made: ${err.message}`);
          else connection.end(); // Enviamos mensajes
        });
      } else {
        connection.write(JSON.stringify({'type': 'completed'}), (err) => { // Si el type es de completado
          if (err) console.log(`Request could not be made: ${err.message}`);
          else connection.end(); // Enviamos mensajes
        });
      }
    });
  });

  // Este método se acciona cuando el cliente cierra el programa, informando de este mediante un console
  connection.on('close', () => {
    console.log('A client has disconnected.');
  });
});

// Se especifica que el servidor va a estar escuchando u observando el puerto TCP 60300
server.listen(60300, () => {
  console.log('Waiting for clients to connect.');
});
