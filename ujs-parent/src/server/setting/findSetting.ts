import getSettings from "./getSettings";


async function findSetting(url : string) {
    const settings = await getSettings();
    return settings.find(setting => setting.url === url);
}

export default findSetting;