import React, { Component } from 'react';
import InfoForm from './InfoForm';
import InfoList from './InfoList';
import information from '../../../../server/data.json';

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
  
  render() {
    const { information } = this.state;
    return (
      <div>
        <InfoForm
          onCreate={this.handleCreate}
        />
        <InfoList
          data={information}
          onRemove={this.handleRemove}
        />
      </div>
    );
  }
}

export default InfoApp;
