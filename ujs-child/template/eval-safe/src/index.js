
function evalSafe(code, context) {
    return (function() {
        with({
            evalSafe: undefined,
            code: undefined,
            context: undefined,
    
            globalThis: undefined,

            __dirname: undefined,
            __filename: undefined,
            clearImmediate: undefined,
            clearInterval: undefined,
            clearTimeout: undefined,
            console: undefined,
            exports: undefined,
            global: undefined,
            module: undefined,
            process: undefined,
            queueMicrotask: undefined,
            setImmediate: undefined,
            setInterval: undefined,
            setTimeout: undefined,

            WebAssembly: undefined,

            arguments: undefined,

            ...context,
            __code: code
        }) {
            return eval(__code);
        }
    }).call(undefined);
}

module.exports = {
    evalSafe
};
