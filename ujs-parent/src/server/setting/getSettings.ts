
import fs from "fs";

export interface Info {
    name: string,
    url: string,
    docker: boolean
    directories: {
      [name: string]: string
    },
    dependencies: {
      [name: string]: string
    },
    ports: number[],
    openExplorerPerm: boolean
}

export const DATA_PATH = "./datas/src/server/data.json";

async function getSettings() : Promise<Info[]> {
    return JSON.parse(await (await fs.promises.readFile(DATA_PATH)).toString());
}

export default getSettings;