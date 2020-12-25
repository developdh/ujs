import React, { Component, useState, useEffect } from 'react';
import Directory, { Directories } from './Directory/Directory';
import Dependency from './Dependency/Dependency'
import Port from './Port/Port';
import DependencyList, { Dependencies } from './Dependency/DependencyList';
import { Info } from './SettingApp';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';

function SettingInfo({ info, onRemove, onUpdate }: {
  info: Info,
  onRemove: (id: string) => void,
  onUpdate: (id: string, info: Info) => void
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
    name, url, docker
  } = info;

  const [directories, setDirectories] = useState(info.directories);
  const [dependencies, setDependencies] = useState(info.dependencies);
  const [ports, setPorts] = useState(info.ports);

  const styleA = {
    color: 'white',
  }

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
      <Button onClick={handleRemove}>
        <DeleteIcon style={styleA} fontSize="small" />
      </Button>
      <div>
        <Directory directories={directories} onUpdate={setDirectories} />
        {!docker ? <Dependency dependencies={dependencies} onUpdate={setDependencies} /> : undefined}
        <Port ports={ports} onUpdate={setPorts} />
      </div>
    </div>
  );
}

export default SettingInfo;