/* eslint-disable brace-style */
/**
 * Para ejecutar abra dos terminales, primeramente en una deberá introducir `node dist/server.js`, para activar el servidor,
 * y en el otro `node dist/client.js Ejemplo de mensaje`, que mandará un mensaje desde el cliente al servidor,
 * se deberá sustituir "Ejemplo de mensaje" por el mensaje que se quiera almacenar.
 * El historial quedará almacenado dentro del fichero history.txt de la carpeta `src`.
 */

import * as net from 'net';

// Si la linea de argumentos es menor a 3, es que no se ha incluido ningún mensaje desde la línea de comandos
if (process.argv.length < 3) console.log('A message must be specified');
else {
  let message: string = '';
  // Se establece la conexión en dicho puerto TCP mediante la función connect del módulo net, y se devuelve un socket
  const client = net.connect({port: 60300});
  message = process.argv.splice(2).join(' ');

  // Enviamos un mensaje en formato JSON al servidor
  client.write(JSON.stringify({'type': 'message', 'text': message}), (err) => {
    if (err) console.log(`Request could not be made: ${err.message}`);
    else client.end(); // Enviamos mensajes
  });

  let wholeData: string = '';

  // Obtenemos el mensaje mediante el evento data
  client.on('data', (chunk) => {wholeData += chunk;});

  // Con el evento end, significa que el servidor ya envió el mensaje, por lo que ya podemos utilizar lo recibido en data
  client.on('end', () => {
    const request = JSON.parse(wholeData); // Convertimos a formato JSON
    if (request.type === 'error') console.log('Error adding message to history'); // Si el type es de error
    else if (request.type === 'completed') console.log('Message successfully added to history'); // Si el type es de completado
  });

  // Este método se acciona cuando se recibe un evento de error, informando de este mediante un console
  client.on('error', (err) => {
    console.log(`Connection could not be established: ${err.message}`);
  });
}
