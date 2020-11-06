import React from 'react';
import { NavLink } from 'react-router-dom';
import CSS from 'csstype';

const Menu = () => {
    const activeStyle = {
        color: '#49c0ec',
    };

    const ul:CSS.Properties = {
        listStyle: 'none',
        paddingLeft: '16px',
        display: 'flex',
    }

    const li: CSS.Properties = {
        paddingLeft: '10px',
        paddingRight: '10px',
        borderRight: '1px solid gray',
    }

    const link: CSS.Properties = {
        textDecoration: 'none',
    }

    return (
        <div>
            <ul style={ul}>
                <li style={li}><NavLink exact to="/" activeStyle={activeStyle} style={link}>Main</NavLink></li>
                <li style={li}><NavLink to="/setting" activeStyle={activeStyle} style={link}>setting</NavLink></li>
                <li style={li}><NavLink to="/info" activeStyle={activeStyle} style={link}>info</NavLink></li>
            </ul>
            <hr/>
        </div>
    );
};

export default Menu;