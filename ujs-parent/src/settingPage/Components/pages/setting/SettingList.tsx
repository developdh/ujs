import React, { Component } from 'react';
import SettingInfo from './SettingInfo';

class SettingList extends Component {
  static defaultProps = {
    data: [],
    onRemove: () => console.warn('onRemove not defined'),
  }
  props: any;

  render() {
    const { onRemove, onUpdate, data } = this.props;
    const list = data.map(
      info => (
        <SettingInfo
          key={info.id}
          info={info}
          onRemove={onRemove}
          onUpdate={onUpdate}
        />)
    );

    return (
      <div>
        {list}
      </div>
    );
  }
}

export default SettingList;