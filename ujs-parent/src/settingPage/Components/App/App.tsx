import React, { Component } from 'react';
import { Route, HashRouter } from 'react-router-dom';
import DashboardPage from '../pages/DashboardPage';
import Menu from '../component/Menu';
import SettingApp from '../pages/setting/SettingApp';
import {Properties as css} from 'csstype';


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
            </HashRouter>
        </body>
    );
}

export default App;
