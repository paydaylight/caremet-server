const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const WebSocket = require('ws');
const {connect} = require('./websocket/callbacks');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });
connect(wss);

app.use(bodyParser.urlencoded({
    extended: true
}));
    
app.use(bodyParser.json());

require('./routes/login_routes')(app)

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`app running on port ${PORT}, ${process.env.NODE_ENV}`)
});
