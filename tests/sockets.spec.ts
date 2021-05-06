import 'mocha';
import {expect} from 'chai';
import {EventEmitter} from 'events';
import * as fs from 'fs';

let wholeData: string = '';
const server = new EventEmitter();
const client = new EventEmitter();

describe('Sockets test', () => {
  it('Client test: Should send a message from client', (done) => {
    // Client debe poder enviar un mensaje y llegar correctamente a server
    server.on('data', (chunk) => {
      wholeData += chunk;
      expect(wholeData).to.be.eql({'type': 'message', 'text': 'Un mensaje'});
    });
    client.emit('data', {'type': 'message', 'text': 'Un mensaje'});
    done();
  });

  it('Server test: Should add the message to history', (done) => {
    // Server debe procesar un mensaje recibido por client y añadirlo al fichero, cuando reciba un evento end por parte de Client
    server.on('end', () => {
      const request = JSON.parse(wholeData);

      console.log('Message obtained from client');

      fs.appendFile('src/history.txt', request.text + '\n', (err) => {
        if (err) {
          server.emit('data', {'type': 'error'});
          server.emit('end');
        } else {
          server.emit('data', {'type': 'completed'});
          server.emit('end');
        }
        expect(request.text).to.be.equal('Un mensaje');
      });
    });
    client.emit('end');
    done();
  });
});
