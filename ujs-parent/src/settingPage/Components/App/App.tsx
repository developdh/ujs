import React, { Component } from 'react';
import { Route, HashRouter } from 'react-router-dom';
import MainPage from '../pages/MainPage';
import SettingPage from '../pages/SettingPage';
import Menu from '../component/Menu';
import InfoApp from '../pages/info/InfoApp';


class App extends Component {
    render() {
        return (
            <div>
                <HashRouter>
                    <Route path="/" component={Menu}/>
                    <Route exact path="/" component={MainPage}/>
                    <Route path="/setting" component={SettingPage}/>
                    <Route path="/info" component={InfoApp}/>
                </HashRouter>
            </div>
        );
    }
}

export default App;
