# wsInExpress
Simple library for adding WebSocket to ExpressApp

# How to use
```js
const express = require('express');
const wsInExpress = require('./wsInExpress.js');

const app = express();
wsInExpress(app);

app.get('/', (req, res) => {
    res.send('Hello World! (GET)');
});
app.ws('/', (ws, req) => {
    ws.send('Hello World! (WS)');
});

app.listen(3000);
```
