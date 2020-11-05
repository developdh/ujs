import React, { Component } from 'react';
import InfoInfo from './InfoInfo';

class InfoList extends Component {
  static defaultProps = {
    list: [],
    onRemove: () => console.warn('onRemove not defined'),
  }
  props: any;
  render() {
    const { data, onRemove } = this.props;
    const list = data.map(
      info => (
        <InfoInfo
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

export default InfoList;