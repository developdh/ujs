
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
    process.send({
        type:"mesesage",
        message:message
    });
}

function messageReceived(message) {
    for (const handler of messageHandlers) {
        handler(message);
    }
}


const depedenciesI = process.argv.indexOf("/");
const dependencies = process.argv.slice(2, depedenciesI);
const realDirectoriesI = process.argv.indexOf("/", depedenciesI + 1);
const realDirectories = {
    ...Object.fromEntries(process.argv.slice(depedenciesI + 1, realDirectoriesI).map(v => v.split(":")))
};
const directories = realDirectories;
const rDirs = realDirectories;
const dirs = directories;
const openExplorerPerm = process.argv.slice(realDirectoriesI + 1)[0] === "1" ? true : false;


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


function openExplorer(path) {
    process.send({
        type: "openExplorer",
        path: path
    });
}


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
            realDirectories,
            directories,
            rDirs,
            dirs,
            openExplorer,
            openExplorerPerm
        });
    } else if (message.type === "message") {
        messageReceived(message.data);
    } else if (message.type === "error") {
        throw message.error;
    }
});