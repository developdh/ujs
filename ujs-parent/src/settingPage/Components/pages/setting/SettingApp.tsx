import React, { Component } from 'react';
import SettingForm from './SettingForm';
import SettingList from './SettingList';
import axios from 'axios';

class SettingApp extends Component {
  id = 0
  state = {
    information: [
      {
        id: 0,
        name: '',
        version: '',
        checked: true
      }
    ]
  }
  props: any;
  handleCreate = (data) => {
    const { information } = this.state;
    this.setState({
      information: information.concat({ id: this.id++, ...data })
    });
  }
  handleRemove = (id) => {
    const { information } = this.state;
    this.setState({
      information: information.filter(info => info.id !== id)
    });
  }
  componentDidMount(){
    axios.get('http://localhost:2933/setting').then(res => {this.setState({information: res.data})});
  }
  render() {
    const { information } = this.state;
    
    const buttonStyle = {
      width: "40px",
      hight: "30px",
    }
    return (
      <div>
        <SettingForm
          onCreate={this.handleCreate}
        />
        <SettingList
          data={information}
          onRemove={this.handleRemove}
        />
        <button style={buttonStyle} onClick={() => {
          axios.post('http://localhost:2933/setting', {setting: JSON.stringify(information)});
        }}>저장</button>
      </div>
    );
  }
}

export default SettingApp;
