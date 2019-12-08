const WebSocket = require('ws');
module.exports = { 
    connect: (wss) => {
        wss.on('connection', (ws) => {
            ws.isAlive = true;

            ws.on('pong', () => {
                ws.isAlive = true;
            });

            ws.on('message', (message) => {
                wss.clients.forEach(function each(client) {
                    if (client.readyState === WebSocket.OPEN) {
                        if(client !== ws) client.send(message);
                    }
                });
            }); 
        });

        setInterval(() => {
            wss.clients.forEach((ws) => {
                
                if (!ws.isAlive) return ws.terminate();
                
                ws.isAlive = false;
                ws.ping(null, false, true);
            });
        }, 10000);
    }
}