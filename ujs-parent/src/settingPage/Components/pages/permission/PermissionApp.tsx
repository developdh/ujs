import React, { Component } from 'react';
import PermissionForm from './PermissionForm';
import PermissionList from './PermissionList';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';

class PermissionApp extends Component {
    id = 0
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
        axios.get('http://localhost:2933/permission').then(res => { this.setState({ information: res.data }) });
    }
    render() {
        const { information } = this.state;

        const buttonStyle = {
            width: "100px",
            height: "30px",
            backgroundColor: '#181F29',
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
                <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    style={buttonStyle}
                    startIcon={<SaveIcon />}
                    onClick={() => {
                        axios.post('http://localhost:2933/permission', { setting: JSON.stringify(information) });
                    }}>Save
                </Button>
            </div>
        );
    }
}

export default PermissionApp;
