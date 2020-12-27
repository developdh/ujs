
import { settings } from "cluster";
import fs from "fs";
import getSettings, { Info } from "./getSettings";
import setSettings from "./setSettings";

async function pushSetting(info : Info) {
    let infos = await getSettings();
    // 이전 setting 이 있다면 지우고 넣기
    const finded = infos.find(setting => setting.url === info.url)
    if(finded){
        infos[infos.indexOf(finded)] = info;
    }else{
        infos.push(info);
    }
    setSettings(infos);
}

export default pushSetting;