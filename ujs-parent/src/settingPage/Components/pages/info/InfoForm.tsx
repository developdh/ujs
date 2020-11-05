import React, { Component } from 'react';

class InfoForm extends Component {
  state = {
    name: '',
    url: ''
  }

  props: any;
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.onCreate(this.state);
    this.setState({
      name: '',
      url: ''
    })
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          placeholder="이름"
          value={this.state.name}
          onChange={this.handleChange}
          name="name"
        />
        <input
          placeholder="URL"
          value={this.state.url}
          onChange={this.handleChange}
          name="url"
        />
        <button type="submit">등록</button>
      </form>
    );
  }
}

export default InfoForm;
