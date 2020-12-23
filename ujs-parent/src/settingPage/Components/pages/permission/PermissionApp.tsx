import React, { Component } from 'react';
import PermissionForm from './PermissionForm';
import PermissionList from './PermissionList';
import axios from 'axios';

class PermissionApp extends Component {
    id = 1
    state = {
        information: [
            {
                id: 0,
                name: '',
                version: '',
            }
        ]
    }
    props: any;
    handleCreate = (data) => {
        const { information } = this.state;
        this.setState({
            information: information.concat({ id: this.id++, ...data })
        });
    }
    handleRemove = (id) => {
        const { information } = this.state;
        this.setState({
            information: information.filter(info => info.id !== id)
        });
    }
    componentDidMount() {
        axios.get('http://localhost:2933/permission').then(res => {this.setState({information: res.data})});
    }
    render() {
        const { information } = this.state;

        const buttonStyle = {
            width: "40px",
            hight: "30px",
        }
        return (
            <div>
                <PermissionForm
                    onCreate={this.handleCreate}
                />
                <PermissionList
                    data={information}
                    onRemove={this.handleRemove}
                />
                <button style={buttonStyle} onClick={() => {
                    axios.post('http://localhost:2933/permission', {setting: JSON.stringify(information)});
                }}>저장</button>
            </div>
        );
    }
}

export default PermissionApp;
