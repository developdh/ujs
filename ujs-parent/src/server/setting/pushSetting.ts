
import fs from "fs";
import getSettings, { Info } from "./getSettings";
import setSettings from "./setSettings";

async function pushSetting(info : Info) {
    const infos = await getSettings();
    infos.push(info);
    setSettings(infos);
}

export default pushSetting;