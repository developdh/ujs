import React, { Component } from 'react';
import SettingInfo from './SettingInfo';

class SettingList extends Component {
  static defaultProps = {
    data: [],
    onRemove: () => console.warn('onRemove not defined'),
  }
  props: any;
  state : { data: any } = { data:[] } as any;
  componentDidMount() {
    this.setState(state => ({ ...state, data:this.props.data }));
  }
  render() {
    const { onRemove, onUpdate } = this.props;
    const { data } = this.state;
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