import React from 'react';
import { NavLink } from 'react-router-dom';
import {Properties as css} from 'csstype';
import './Menu.css';

const Menu = () => {
    const activeStyle: css = {
        color: '#49c0ec',
        fontSize: '20px'
    };

    const nav: css = {
        backgroundColor: '#181F29',
    };

    const ul: css = {
        listStyle: 'none',
        paddingLeft: '16px',
        display: 'flex',
        alignItems: 'center',
        margin: '0px',
    };

    const li: css = {
        paddingLeft: '10px',
        color: '#49c0ec',
        fontSize: '15px'
    };

    const link: css = {
        textDecoration: 'none',
    };

    const logo: css = {
        color: '#705DED',
        fontSize: '30px',
    };

    return (
        <nav style={nav}>
            <ul style={ul}>
                <li><span id="logo" style={logo}>UJS</span></li>
                <li style={li}><NavLink exact to="/" activeStyle={activeStyle} style={link}>Main</NavLink></li>
                <li style={li}><NavLink to="/setting" activeStyle={activeStyle} style={link}>setting</NavLink></li>
            </ul>
            <hr/>
        </nav>
    );
};

export default Menu;