const WebSocket = require('ws');

async function wsInExpress(app) {
    const wsServer = new WebSocket.Server({ noServer: true });
    const wsRoutes = [];
    const appListen = app.listen.bind({});

    app.ws = (path, fn) => wsRoute.push({ path, fn });
    app.listen = (...args) => {
        let server = appListen(...args);
        server.on('upgrade', (req, socket, head) => {
            let route = wsRoutes.find((route) => req.url.includes(route.path));
            if (route) wsServer.handleUpgrade(req, socket, head, (ws) => route.fn(ws, req));
        });
        return server;
    };
}

module.exports = wsInExpress;
