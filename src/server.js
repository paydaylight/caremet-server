const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const {connect} = require('./websocket/callbacks');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });
connect(wss);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`app running on port ${PORT}, ${process.env.NODE_ENV}`)
});
