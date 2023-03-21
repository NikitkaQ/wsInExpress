# wsAwait
Simple library for adding WebSocket to ExpressApp

# How to use

Client:
```js
const WebSocket = require('ws');
const { wsAwait_Client } = require('./wsAwait.js');

const ws = new WebSocket('ws://www.host.com/path');
wsAwait_Client(ws);

await ws.ready();

let msg = await ws.sendAsync('Hello World!!!');
console.log(msg);
```

Server:
```js
const WebSocket = require('ws');
const { wsAwait_Server } = require('./wsAwait.js');

const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', (ws) => {
    wsAwait_Server(ws);

    ws.onAsync('message', (rawData, _id, data) => {
        console.log(`Raw data: ${rawData}`);
        console.log(`Msg ID: ${_id}`);
        console.log(`Data: ${data}`);

        ws.sendAsync(_id, 'Hello Program');
    });
});
```
