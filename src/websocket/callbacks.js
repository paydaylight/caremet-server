const WebSocket = require('ws');
module.exports = { 
    connect: (wss) => {
        wss.on('connection', (ws) => {
            ws.on('message', (message) => {
                console.log('received: %s', message);
                ws.send(`Hello, you sent -> ${message}`);
            }); 
            ws.send('Hi there, I am a WebSocket server');
        });
    }
}