import WebSocket, { WebSocketServer } from 'ws';
import http from 'http';

const server = http.createServer((request, response) => {
    console.log((new Date()) + ' Received request for ' + request.url);
    response.end("hi there");
});

// Create a WebSocket server
const wss = new WebSocketServer({ server });

// Event listener for new connections
wss.on('connection', function connection(ws) {
    ws.on('error', console.error);
   
    

    ws.on('message', function message(data, isBinary) {
        console.log(data.toString(),'mmmmmmmmmmmmmmmm');

        wss.clients.forEach(function each(client) {
            if (client.readyState === WebSocket.OPEN) {
                client.send(data, { binary: isBinary });
            }
        });
    });

    ws.send('Hello! Message From Server .............!!');
});

server.listen(8080, function() {
    console.log((new Date()) + ' Server is listening on port 8080');
});
