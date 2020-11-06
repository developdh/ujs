import React, { Component } from 'react';
import InfoInfo from './InfoInfo';
import InfoApp from './InfoApp'
import { withRouter } from 'react-router';
import jsondata from '../../../../server/data.json';


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