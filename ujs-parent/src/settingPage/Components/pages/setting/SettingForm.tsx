import React, { Component } from 'react';
import sanitizeHtml from 'sanitize-html';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import AddBoxIcon from '@material-ui/icons/AddBox';

class SettingForm extends Component {
  state = {
    name: '',
    url: '',
    dependencies: {},
    ports:[],
    directories: {},
    docker:true
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
      allowedTags: ['b', 'i', 'em', 'strong', 'a'],
      allowedAttributes: {
        'a': ['href']
      },
    };

    const sanitize = (dirty, options) => ({
      __html: sanitizeHtml(
        dirty,
        { ...defaultOptions, ...options }
      )
    });
    const buttonStyle = {
      width: "100px",
      height: "47px",
      backgroundColor: '#181F29',
    }
    return (
      <form onSubmit={this.handleSubmit}>
        <TextField
          label="Site Name"
          value={sanitizeHtml(this.state.name)}
          onChange={this.handleChange}
          name="name"
        />
        <TextField
          label="URL"
          value={sanitizeHtml(this.state.url)}
          onChange={this.handleChange}
          name="url"
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          size="large"
          style={buttonStyle}
          startIcon={<AddBoxIcon />}
        >
          Enroll
        </Button>
      </form>
    );
  }
}

export default SettingForm;
