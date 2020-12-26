import React, { useState, FormEvent, useRef, useEffect } from "react";
import DependencyList from "./DependencyList";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import AddBoxIcon from '@material-ui/icons/AddBox';
import sanitizeHtml from 'sanitize-html';

export interface Dependencies {
    [key: string]: string
}

function Dependency(props : { dependencies : Dependencies, onUpdate:(Dependency:Dependencies)=>void }) {
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
    const [dependencies, setDependencies] = useState<Dependencies>(props.dependencies);
    const { onUpdate } = props;

    const keyInput = useRef<HTMLInputElement>();
    const valInput = useRef<HTMLInputElement>();

    const [key, setKey] = useState('');
    const [val, setVal] = useState('');

    useEffect(() => {
        onUpdate(dependencies);
    }, [dependencies]);

    function onSubmit(e : FormEvent<HTMLFormElement>) {
        e.preventDefault();
        
        // 이름이 겹쳐요!
        if(key in dependencies) return; 

        // dependency 추가
        setDependencies(dependencies => ({
            ...dependencies,
            [key]: val
        }));
    }

    const styleA = {
        color: 'white',
    }
    return (
        <div>
            <form onSubmit={onSubmit}>
                <TextField type="text" ref={keyInput} onChange = {event => {
                    setKey(event.target.value)
                }} label="key" style={styleA} value={key} InputProps={{inputProps:{style:{color:'white'}}}} InputLabelProps={{style: { color: '#fff' }}}/>
                <TextField type="text" ref={valInput} onChange = {event => {
                    setVal(event.target.value)
                }} label="value" style={styleA} value={val} InputProps={{inputProps:{style:{color:'white'}}}} InputLabelProps={{style: { color: '#fff' }}}/>
                <Button type="submit" style={styleA}>
                    <AddBoxIcon/>
                </Button>
            </form>
            <DependencyList dependencies={dependencies}/>
        </div>
    )
}

export default Dependency;