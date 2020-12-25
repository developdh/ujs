
import React from "react";
import PortItem from "./PortItem";

function PortList({ ports, onRemove } : { ports:number[], onRemove:(port:number)=>void }) {
    return (
        <div>
            {
                ports.map((port, i) => 
                    <PortItem port={port} onRemove={() => onRemove(port)} key={i}/>
                )
            }
        </div>
    )
}

export default PortList;