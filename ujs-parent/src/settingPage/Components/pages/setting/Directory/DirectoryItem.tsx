import React from "react";
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';

function DirectoryItem({ name, path, onRemove } : { name:string, path:string, onRemove:()=>void }) {
    const styleA = {
        color: 'white',
    }
    return (
        <div>
            {name}
            {` :: `}
            {path}
            <Button onClick={onRemove}>
                <DeleteIcon style={styleA} fontSize="small"/>
            </Button>
        </div>
    );
}

export default DirectoryItem;