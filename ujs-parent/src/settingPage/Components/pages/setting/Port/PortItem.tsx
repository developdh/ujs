import React from "react";
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';

function PortItem({ port, onRemove } : { port:number, onRemove:()=>void }) {
    const styleA = {
        color: 'white',
    }
    return (
        <div>
            {port}
            <Button onClick={onRemove}>
                <DeleteIcon style={styleA} fontSize="small"/>
            </Button>
        </div>
    );
}

export default PortItem;