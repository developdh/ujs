import React, { Component } from 'react';
import PermissionInfo from './PermissionInfo';

class PermissionList extends Component {
  static defaultProps = {
    list: [],
    onRemove: () => console.warn('onRemove not defined'),
  }
  props: any;
  render() {
    const { data, onRemove } = this.props;
    const list = data.map(
      info => (
        <PermissionInfo
          key={info.id}
          info={info}
          onRemove={onRemove}
        />)
    );

    return (
      <div>
        {list}
      </div>
    );
  }
}

export default PermissionList;