
import fs from "fs";
import { DATA_PATH, Info } from "./getSettings";

async function setSettings(settings : Info[]) {
    await fs.promises.writeFile(DATA_PATH, JSON.stringify(settings));
}

export default setSettings;