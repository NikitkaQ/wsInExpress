# wsInExpress
Simple library for adding WebSocket to ExpressApp

# How to use
```js
const express = require('express');
const wsInExpress = require('./wsInExpress.js');

const app = express();
wsInExpress(app);

app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.ws('/', (ws, req) => {
    ws.send('Hello World!');
});

app.listen(3000, () => console.log(`Example app listening on port 3000`));
```
- dependencies
  ```
  npm i ws
  ```
