import React from "react";

function DependencyItem({ name, version } : { name:string, version:string }) {
    return (
        <div>
            {name}
            {` :: `}
            {version}
        </div>
    )
}

export default DependencyItem;