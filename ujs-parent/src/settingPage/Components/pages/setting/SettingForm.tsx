import React, { Component } from 'react';
import sanitizeHtml from 'sanitize-html';

class SettingForm extends Component {
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
    const defaultOptions = {
      allowedTags: [ 'b', 'i', 'em', 'strong', 'a' ],
      allowedAttributes: {
        'a': [ 'href' ]
      },
    };
    
    const sanitize = (dirty, options) => ({
      __html: sanitizeHtml(
        dirty, 
        { ...defaultOptions, ...options }
      )
    });
    
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          placeholder="이름"
          value={sanitizeHtml(this.state.name)}
          onChange={this.handleChange}
          name="name"
        />
        <input
          placeholder="URL"
          value={sanitizeHtml(this.state.url)}
          onChange={this.handleChange}
          name="url"
        />
        <button type="submit">등록</button>
      </form>
    );
  }
}

export default SettingForm;
