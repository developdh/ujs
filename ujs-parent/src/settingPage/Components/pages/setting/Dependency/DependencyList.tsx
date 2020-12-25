import React from "react";
import DependencyItem from "./DepedencyItem";

export interface Dependencies {
    [name: string]: string
}

function DependencyList({ dependencies } : { dependencies: Dependencies }) {
    return (
        <div>
            {
                Object.entries(dependencies).map(([name, version], i) => 
                    <DependencyItem name={name} version={version} key={i}/>
                )
            }
        </div>
    );
}

export default DependencyList;