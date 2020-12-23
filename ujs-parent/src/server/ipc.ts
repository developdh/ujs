import { ipcMain } from 'electron';

export function ipcStart(){
    ipcMain.on('asynchronous-message', (event, arg) => {
        console.log(arg);
        event.reply('asynchronous-reply', 'pong');
    })

    ipcMain.on('synchronous-message', (event, arg) => {
        console.log(arg);
        event.returnValue = 'pong';
    })
}