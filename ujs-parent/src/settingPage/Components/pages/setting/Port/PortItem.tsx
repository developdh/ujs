

import React from "react";

function PortItem({ port, onRemove } : { port:number, onRemove:()=>void }) {
    return (
        <div>
            {port}
            <div onClick={onRemove}>
                X
            </div>
        </div>
    );
}

export default PortItem;