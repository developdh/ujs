
import React from "react";
import ReactDOM from "react-dom";
import App from "./Components/App/App";
import { ipcRenderer } from 'electron';
import axios from 'axios';


/**
 * This file will automatically be loaded by webpack and run in the "renderer" context.
 * To learn more about the differences between the "main" and the "renderer" context in
 * Electron, visit:
 *
 * https://electronjs.org/docs/tutorial/application-architecture#main-and-renderer-processes
 *
 * By default, Node.js integration in this file is disabled. When enabling Node.js integration
 * in a renderer process, please be aware of potential security implications. You can read
 * more about security risks here:
 *
 * https://electronjs.org/docs/tutorial/security
 *
 * To enable Node.js integration in this file, open up `main.js` and enable the `nodeIntegration`
 * flag:
 *
 * ```
 *  // Create the browser window.
 *  mainWindow = new BrowserWindow({
 *    width: 800,
 *    height: 600,
 *    webPreferences: {
 *      nodeIntegration: true
 *    }
 *  });
 * ```
 */

import './index.css';

const main = document.getElementById("main");

ReactDOM.render(<App/>, main);

console.log(ipcRenderer.sendSync('synchronous-message', 'ping'));

ipcRenderer.on('asynchronous-reply', (event, arg) => {
    console.log(arg);
});

ipcRenderer.send('asynchronous-message', 'ping');

// 새코드
ipcRenderer.on('get-setting', (event, arg) => {
    console.log(arg);
});
ipcRenderer.send('get-setting')

// 원코드
axios.get('http://localhost:2933/setting').then(res => {console.log(res.data)});

ipcRenderer.on('error', (event, arg) => {
    console.error(arg);
})