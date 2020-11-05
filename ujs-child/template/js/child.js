
const { evalSafe } = require("eval-safe");

const messageHandlers = new Set();

const save = { $: {} };

function onMessage(handler) {
    messageHandlers.add(handler);
}

function offMessage(handler) {
    messageHandlers.delete(handler);
}

function sendMessage(message) {
    process.send(message);
}

function messageReceived(message) {
    for (const handler of messageHandlers) {
        handler(message);
    }
}

process.on("message", message => {
    if (message.type === "exec") {
        evalSafe(message.command, {
            onMessage,
            offMessage,
            sendMessage,
            ...save,
            console
        });
        process.send({
            type: 'spawn_close'
        })
    } else if (message.type === "message") {
        messageReceived(message.data);
    }
});