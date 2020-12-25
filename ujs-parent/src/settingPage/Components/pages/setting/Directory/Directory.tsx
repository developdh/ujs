
import React, { useState, FormEvent, useRef, useEffect } from "react";
import DirectoryList from "./DirectoryList";

export interface Directories {
    [name: string]: string
}

function Directory(props : { directories : Directories, onUpdate:(directories:Directories)=>void }) {
    const [directories, setDirectories] = useState<Directories>(props.directories);
    const { onUpdate } = props;

    const nameInput = useRef<HTMLInputElement>();
    const pathInput = useRef<HTMLInputElement>();

    useEffect(() => {
        onUpdate(directories);
    }, [directories]);

    function onSubmit(e : FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const name = nameInput.current.value;
        const path = pathInput.current.value;
        
        // 이름이 겹쳐요!
        if(name in directories) return; 

        // directory 추가
        setDirectories(directories => ({
            ...directories,
            [name]: path
        }));
    }

    function removeDirectory(targetName : string) {
        setDirectories(directories => 
            (Object as any).fromEntries(
                Object.entries(directories)
                    .filter(([name, value]) => name !== targetName)
            )
        );
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input type="text" ref={nameInput} placeholder="name"/>
                <input type="text" ref={pathInput} placeholder="path"/>
                <input type="submit" value="+"/>
            </form>
            <DirectoryList directories={directories} onRemove={removeDirectory}/>
        </div>
    )
}

export default Directory;