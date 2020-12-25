import React from "react";

function DirectoryItem({ name, path, onRemove } : { name:string, path:string, onRemove:()=>void }) {
    return (
        <div>
            {name}
            {` :: `}
            {path}
            <div onClick={onRemove}>
                X
            </div>
        </div>
    );
}

export default DirectoryItem;