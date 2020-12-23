import React, { Component } from 'react';
import { Route, HashRouter } from 'react-router-dom';
import DashboardPage from '../pages/DashboardPage';
import About from '../pages/About'
import Menu from '../component/Menu';
import SettingApp from '../pages/setting/SettingApp';
import {Properties as css} from 'csstype';
import PermissionApp from '../pages/permission/PermissionApp';


const App = () => {
    const cssColor: css = {
        color: "white"
    }

    return (
        <body style={cssColor}>
            <HashRouter>
                <Route path="/" component={Menu}/>
                <Route exact path="/" component={DashboardPage}/>
                <Route exact path="/setting" component={SettingApp}/>
                <Route exact path="/permission" component={PermissionApp}/>
                <Route exact path="/about" component={About}/>
            </HashRouter>
        </body>
    );
}

export default App;
