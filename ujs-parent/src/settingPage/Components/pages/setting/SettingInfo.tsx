import React, { Component, useState, useEffect } from 'react';
import Directory, { Directories } from './Directory/Directory';
import Port from './Port/Port';
import DependencyList, { Dependencies } from './Dependency/DependencyList';
import { Info } from './SettingApp';

function SettingInfo({ info, onRemove, onUpdate } : {
  info:Info,
  onRemove:(id:string)=>void,
  onUpdate:(id:string, info:Info)=>void
}) {
  const handleRemove = () => {
    onRemove(info.url);
  }

  const style = {
    border: '1px solid black',
    padding: '8px',
    margin: '8px'
  };

  const {
    name, url, docker, dependencies
  } = info;

  const [directories, setDirectories] = useState(info.directories);
  const [ports, setPorts] = useState(info.ports);

  useEffect(() => {
    onUpdate(info.url, {
      ...info,
      directories,
      ports
    });
  }, [directories, ports]);

  return (
    <div style={style}>
      <b>{name}</b>{'  '}
      {url}{'  '}
      <button onClick={handleRemove}>삭제</button>
      <div>
        <Directory directories={directories} onUpdate={setDirectories}/>
        {!docker ? <DependencyList dependencies={dependencies}/> : undefined}
        <Port ports={ports} onUpdate={setPorts}/>
      </div>
    </div>
  );
}

export default SettingInfo;