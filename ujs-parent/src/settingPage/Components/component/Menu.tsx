import React from 'react';
import { NavLink } from 'react-router-dom';
import {Properties as css} from 'csstype';
import './Menu.css';

const Menu = () => {
    const activeStyle = {
        color: '#49c0ec',
    };

    const ul: css = {
        listStyle: 'none',
        paddingLeft: '16px',
        display: 'flex',
        alignItems: "center",
    }

    const li: css = {
        paddingLeft: '10px',
        paddingRight: '10px',
        borderRight: '1px solid gray',
    }

    const link: css = {
        textDecoration: 'none',
    }

    return (
        <nav>
            <ul style={ul}>
                <li><span id="logo">UJS</span></li>
                <li style={li}><NavLink exact to="/" activeStyle={activeStyle} style={link}>Main</NavLink></li>
                {/* <li style={li}><NavLink to="/setting" activeStyle={activeStyle} style={link}>setting</NavLink></li> */}
                <li style={li}><NavLink to="/info" activeStyle={activeStyle} style={link}>info</NavLink></li>
            </ul>
            <hr/>
        </nav>
    );
};

export default Menu;