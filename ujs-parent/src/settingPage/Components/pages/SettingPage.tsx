import React, { Component } from 'react';

class SettingPage extends Component {
    id = 2;
    state = {
        txt : "",
        list: []
    }
    
      render() {
        return (
            <div>
                <form onSubmit={e => {
                    e.preventDefault();
                    this.setState({
                        list: this.state.list.concat(this.state.txt)
                    })
                }}>
                <input
                    type="text"
                    value={this.state.txt}
                    onChange={(e) => {
                    this.setState({ txt : e.target.value });
                    }}
                />
                <input
                    type="submit"
                    value="제출"
                />
            </form>
            {this.state.list.map((comp, index) => (
                <li key={index}>{comp}</li>
            ))}
            </div>
        )
    }
};

export default SettingPage;