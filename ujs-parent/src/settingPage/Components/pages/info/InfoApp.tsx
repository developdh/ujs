import React, { Component } from 'react';
import InfoForm from './InfoForm';
import InfoList from './InfoList';
import jsondata from '../../../../server/data.json';
import axios from 'axios';

class InfoApp extends Component {
  id = 2
  state = {
    information: [
      {
        id: 0,
        name: 'Naver',
        url: 'https://naver.com'
      },
      {
        id: 1,
        name: 'Google',
        url: 'https://google.com'
      }
    ]
  }
  props: any;
  handleCreate = (data) => {
    const { information } = this.state;
    this.setState({
      information: information.concat({ id: this.id++, ...data })
    })
  }
  handleRemove = (id) => {
    const { information } = this.state;
    this.setState({
      information: information.filter(info => info.id !== id)
    })
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
        <InfoForm
          onCreate={this.handleCreate}
        />
        <InfoList
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

export default InfoApp;
