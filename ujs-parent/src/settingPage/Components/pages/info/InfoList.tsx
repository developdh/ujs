import React, { Component } from 'react';
import InfoInfo from './InfoInfo';
import InfoApp from './InfoApp'
import { withRouter } from 'react-router';
import url_data from '../../../../server/data.json';


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
    const buttonStyle = {
      width: "40px",
      hight: "30px",
    }

    return (
      <div>
        {list}

        <button style={buttonStyle} onClick={() => alert()}>저장</button>


      </div>
    );
  }
}

export default InfoList;