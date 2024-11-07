// server.js
const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Serve static files
app.use(express.static(__dirname + '/public'));

// WebSocket connection handling
wss.on('connection', (ws) => {
    console.log('New client connected');
    
    // Broadcast any received message to all clients
    ws.on('message', (message) => {
        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    });

    // Notify when client disconnects
    ws.on('close', () => {
        console.log('Client disconnected');
    });
});

// Start the server
server.listen(3000, () => {
    console.log('Server is listening on http://localhost:3000');
});
