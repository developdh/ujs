import React, { Component } from 'react';
import SettingForm from './SettingForm';
import SettingList from './SettingList';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import { ipcRenderer } from 'electron';
const { dialog } = require('electron').remote.dialog;

interface State {
  information: Info[]
}

export interface Info {
  name: string,
  url: string,
  docker: boolean,
  openExplorerPerm: boolean,
  directories: {
    [name: string]: string
  },
  dependencies: {
    [name: string]: string
  },
  ports: number[]
}

class SettingApp extends Component {
  id = 0
  state : State = {
    information: []
  }
  props: any;

  handleCreate = (data) => {
    const { information } = this.state;
    this.setState({
      information: information.concat({ id: this.id++, ...data })
    });
  }
  handleRemove = (url) => {
    const { information } = this.state;
    this.setState({
      information: information.filter(info => info.url !== url)
    });
  }
  handleUpdate = (url, newInfo) => {
    const { information } = this.state;
    this.setState({
      information: information.map(info => info.url === url ? newInfo : info)
    });
  }
  componentDidMount() {
    // axios.get('http://localhost:2933/setting').then(res => { this.setState({ information: res.data }) });
    ipcRenderer.once('get-setting', (event, arg) => {
      this.setState({ information: arg })
    });
    ipcRenderer.send('get-setting');
  }
  render() {
    const { information } = this.state;
    const buttonStyle = {
      width: "100px",
      height: "30px",
      backgroundColor: '#181F29',
    }

    return (
      <div>
        <SettingForm
          onCreate={this.handleCreate}
        />
        <SettingList
          data={information}
          onUpdate={this.handleUpdate}
          onRemove={this.handleRemove}
        />
        <Button
          variant="contained"
          color="primary"
          size="large"
          style={buttonStyle}
          startIcon={<SaveIcon />}
          onClick={(e) => {
            //axios.post('http://localhost:2933/setting', { setting: JSON.stringify(information) });
            ipcRenderer.send('set-setting', JSON.stringify(information));
          }}>Save
        </Button>
      </div>
    );
  }
}

export default SettingApp;
