
import React, { useState } from "react";
import DirectoryItem from "./DirectoryItem";
import { Directories } from "./Directory";

function DirectoryList({ directories, onRemove } : { directories : Directories, onRemove:(name:string)=>void }) {
    return (
        <div>
            {
                Object.entries(directories).map(([name, path], i) =>
                    <DirectoryItem name={name} path={path} key={i} onRemove={() => onRemove(name)}/>
                )
            }
        </div>
    );
}

export default DirectoryList;