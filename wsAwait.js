function wsAwait_Client(ws, config = {}) {
    const timeout = config?.timeout ?? 20000;
    const readyTimeout = config?.timeout ?? 5000;
    const encode = config?.encode ?? _encode;
    const decode = config?.decode ?? _decode;

    const queue = {};

    ws.on('message', (msg) => {
        try {
            var { _id, data } = decode(msg.toString());
        } catch {
            return;
        }
        if (queue[_id]) queue[_id](data);
    });
    ws.sendAsync = async (data) => {
        return new Promise((r, j) => {
            const _id = _randomString(8);
            ws.send(encode(_id, data));
            let timerId = setTimeout(() => {
                delete queue[_id];
                j(`Websocket timeout expired (${timeout}ms) for the message: ${data}`);
            }, timeout);
            queue[_id] = (data) => {
                clearTimeout(timerId);
                r(data);
            };
        });
    }
    ws.ready = async () => {
        return new Promise((r, j) => {
            if (ws.readyState === 1) return r();
            let timerId = setTimeout(() => j(`Websocket open timed out (${timeout}ms)`), readyTimeout);
            ws.on('open', () => {
                clearTimeout(timerId);
                return r();
            });
        });
    }
}
function wsAwait_Server(ws, config = {}) {
    const encode = config?.encode ?? _encode;
    const decode = config?.decode ?? _decode;

    ws.onAsync = (type, listener) => {
        ws.on(type, (msg) => {
            try {
                var { _id, data } = decode(msg);
            } catch (error) {
                return;
            }
            listener(msg, _id, data);
        });
    }
    ws.sendAsync = (_id, data) => {
        ws.send(encode(_id, data));
    }
}

function _encode(_id, data) {
    return JSON.stringify({ _id, data });
}
function _decode(data) {
    return JSON.parse(data);
}
function _randomString(length, characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789') {
    var string = '';
    for (var i = 0; i < length; i++)
        string += characters.charAt(Math.floor(Math.random() * characters.length));
    return string;
}

module.exports = { wsAwait_Client, wsAwait_Server }
