
import React, { useState, useRef, FormEvent, useEffect } from "react";
import PortList from "./PortList";

function Port(props : { ports: number[], onUpdate:(ports:number[])=>void }) {
    const [ports, setPorts] = useState(props.ports);
    const { onUpdate } = props;

    useEffect(() => {
        onUpdate(ports);
    }, [ports]);

    const portInput = useRef<HTMLInputElement>();

    function onSubmit(e : FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const port = parseInt(portInput.current.value);

        // 포트가 겹쳐요!
        if(ports.includes(port)) return;

        setPorts(ports => [
            ...ports,
            port
        ]);
    }

    function removePort(targetPort : number) {
        setPorts(ports => ports.filter(port => port !== targetPort));
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input type="number" ref={portInput} placeholder="port" min="1" max="65535"/>
                <input type="submit" value="+"/>
            </form>
            <PortList ports={ports} onRemove={removePort}/>
        </div>
    )
}

export default Port;