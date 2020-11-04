import React from 'react';
import { NavLink } from 'react-router-dom';

const Menu = () => {
    const activeStyle = {
        color: '#49c0ec',
        fontSize: "120%"
    };

    return (
        <div>
            <ul>
                <li><NavLink exact to="/" activeStyle={activeStyle}>Main</NavLink></li>
                <li><NavLink to="/setting" activeStyle={activeStyle}>setting</NavLink></li>
            </ul>
            <hr/>
        </div>
    );
};

export default Menu;