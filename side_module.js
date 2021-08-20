const importObject = {
    env: {
        __memory_base: 0,
    }
};

function isWebAssemblySupported() {
    try {
        if (typeof WebAssembly !== "object") {
            return false;
        }
        const module = new WebAssembly.Module(new Uint8Array([
            0x00, 0x61, 0x73, 0x6D,
            0x01, 0x00, 0x00, 0x00
        ]));
        if (module instanceof WebAssembly.Module) {
            const moduleInstance = new WebAssembly.Instance(module);
            return (moduleInstance instanceof WebAssembly.Instance);
        }
    } catch (e) {

    }
    return false;
}

function isInstantiateStreamingSupported() {
    return (typeof WebAssembly.instantiateStreaming === "function");
}

const wasmSupported = isWebAssemblySupported();

console.log((wasmSupported ? "wasm is supported": "wasm is not supported"));

if (wasmSupported){
    WebAssembly.instantiateStreaming(fetch("side_module.wasm"), importObject).then(
        result => {
            const value = result.instance.exports.increment(17);
            console.log(value);
        }
    );
}
