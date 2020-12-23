import { ipcMain } from 'electron';
import * as fs from 'fs';

export function ipcStart(){
    // Test code!
    ipcMain.on('asynchronous-message', (event, arg) => {
        console.log(arg);
        event.reply('asynchronous-reply', 'pong');
    })

    ipcMain.on('synchronous-message', (event, arg) => {
        console.log(arg);
        event.returnValue = 'pong';
    })

    
    // 설정 받기
    ipcMain.on('get-setting', (event, arg) => {
        fs.readFile('./src/server/setting.json', (err, data) => {
            if (err) event.reply('get-setting', err);
            else event.reply('get-setting', data);
        })
    })

    // 설정 바꿈
    ipcMain.on('edit-setting', (event, arg) => {
        const setting = arg as string;
        fs.writeFile('./src/server/setting.json', setting, 'utf-8', (err) => {
            if (err) event.reply('edit-setting', err);
            else event.reply('edit-setting', setting);
        });
    })

    // 권한 받기
    ipcMain.on('get-permission', (event, arg) => {
        fs.readFile('./src/server/permission.json', (err, data) => {
            if (err) event.reply('get-permission', err);
            else event.reply('get-permission', data);
        })
    })

    // 권한 바꿈
    ipcMain.on('edit-permission', (event, arg) => {
        const permission = arg as string;
        fs.writeFile('./src/server/permission.json', permission, 'utf-8', (err) => {
            if (err) event.reply('edit-setting', err);
            else event.reply('edit-setting', permission);
        });
    })
}