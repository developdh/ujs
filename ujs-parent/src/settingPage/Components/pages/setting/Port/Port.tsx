import React, { useState, useRef, FormEvent, useEffect } from "react";
import PortList from "./PortList";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import AddBoxIcon from '@material-ui/icons/AddBox';
import sanitizeHtml from 'sanitize-html';

function Port(props : { ports: number[], onUpdate:(ports:number[])=>void }) {
    const [ports, setPorts] = useState(props.ports);
    const { onUpdate } = props;

    useEffect(() => {
        onUpdate(ports);
    }, [ports]);

    const portInput = useRef<HTMLInputElement>();
    const [port, usePort] = useState(1);

    function onSubmit(e : FormEvent<HTMLFormElement>) {
        e.preventDefault();


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
    const styleA = {
        color: 'white',
    }
    return (
        <div>
            <form onSubmit={onSubmit}>
                <TextField type="number" ref={portInput} placeholder="port" InputProps={{ inputProps: { min:1, max:65535 }}} onChange={(event) => {
                    usePort(parseInt(event.target.value));
                }}/>
                <Button type="submit" style={styleA}>
                    <AddBoxIcon/>
                </Button>
            </form>
            <PortList ports={ports} onRemove={removePort}/>
        </div>
    )
}

export default Port;