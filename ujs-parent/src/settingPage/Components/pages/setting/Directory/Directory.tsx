import React, { useState, FormEvent, useRef, useEffect } from "react";
import DirectoryList from "./DirectoryList";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import AddBoxIcon from '@material-ui/icons/AddBox';
import sanitizeHtml from 'sanitize-html';
import { stripBasename } from "history/PathUtils";

export interface Directories {
    [name: string]: string
}

function Directory(props : { directories : Directories, onUpdate:(directories:Directories)=>void }) {
    const defaultOptions = {
        allowedTags: ['b', 'i', 'em', 'strong', 'a'],
        allowedAttributes: {
          'a': ['href']
        },
      };
  
      const sanitize = (dirty, options) => ({
        __html: sanitizeHtml(
          dirty,
          { ...defaultOptions, ...options }
        )
      });
    const [directories, setDirectories] = useState<Directories>(props.directories);
    const { onUpdate } = props;

    const nameInput = useRef<HTMLInputElement>();
    const pathInput = useRef<HTMLInputElement>();

    const [name, setName] = useState('');
    const [path, setPath] = useState('');

    useEffect(() => {
        onUpdate(directories);
    }, [directories]);

    function onSubmit(e : FormEvent<HTMLFormElement>) {
        e.preventDefault();
        
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
    const styleA = {
        color: 'white',
    }
    return (
        <div>
            <form onSubmit={onSubmit}>
                <TextField type="text" ref={nameInput} onChange = {event => {
                    setName(event.target.value)
                }} label="name" style={styleA} value={name}/>
                <TextField type="text" ref={pathInput} onChange = {event => {
                    setPath(event.target.value)
                }} label="path" style={styleA} value={path}/>
                <Button type="submit" style={styleA}>
                    <AddBoxIcon/>
                </Button>
            </form>
            <DirectoryList directories={directories} onRemove={removeDirectory}/>
        </div>
    )
}

export default Directory;