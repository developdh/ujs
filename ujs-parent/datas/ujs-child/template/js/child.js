
const { evalSafe } = require("eval-safe");
const fs = require("fs");
const path = require("path");

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


const dependencies = process.argv.slice(2, process.argv.indexOf("/"));
const directories = {
    __workspace: path.resolve(__dirname, "../workspace"),
    ...Object.fromEntries(process.argv.slice(process.argv.indexOf("/") + 1).map(v => v.split(":")))
};


function _require(moduleName) {
    if(dependencies.includes(moduleName))
        return require(moduleName)
    else
        throw "Access denied";
}


function isOkPath(targetPath) {
    return Object.values(directories).some(directory => !path.relative(directory, targetPath).includes(".."));
}

const _fs = {
    readFile(path) {
        if(isOkPath(path))
            return fs.promises.readFile(path);
        else
            throw "Access denied";
    },
    writeFile(path, buffer){
        if(isOkPath(path))
            return fs.promises.writeFile(path, buffer);
        else
            throw "Access denied";
    },
    mkdir(path, options) {
        if(isOkPath(path))
            return fs.promises.mkdir(path, options);
        else
            throw "Access denied";
    },
    rmdir(path, options) {
        if(isOkPath(path))
            return fs.promises.rmdir(path, options);
        else
            throw "Access denied";
    },
    exists(path) {
        if(isOkPath(path))
            return fs.existsSync(path);
        else
            throw "Access denied";
    }
};


process.on("message", message => {
    if (message.type === "exec") {
        evalSafe(message.command, {
            onMessage,
            offMessage,
            sendMessage,
            ...save,
            console,
            require: _require, 
            dependencies,
            fs: _fs,
            directories
        });
    } else if (message.type === "message") {
        messageReceived(message.data);
    }
});