import getSettings from "./getSettings";



async function hasSetting(url : string) {
    const settings = await getSettings();
    return settings.some(setting => setting.url === url);
}

export default hasSetting;