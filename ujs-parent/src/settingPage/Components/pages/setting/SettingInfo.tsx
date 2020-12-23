import React, { Component } from 'react';

class SettingInfo extends Component {
  props: any;
  handleRemove = () => {
    const { info, onRemove } = this.props;
    onRemove(info.id);
  }

  render() {
    const style = {
      border: '1px solid black',
      padding: '8px',
      margin: '8px'
    };

    const {
      name, url
    } = this.props.info;

    return (
      <div style={style}>
        <b>{name}</b>{'  '}
        {url}{'  '}
        <button onClick={this.handleRemove}>삭제</button>
      </div>
    );
  }
}

export default SettingInfo;