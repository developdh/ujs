
import React from "react";
import PortItem from "./PortItem";

function PortList({ ports, onRemove } : { ports:number[], onRemove:(port:number)=>void }) {
    return (
        <div>
            {
                ports.map(port => 
                    <PortItem port={port} onRemove={() => onRemove(port)}/>
                )
            }
        </div>
    )
}

export default PortList;