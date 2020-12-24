
import { exec } from "child_process";
import { childImageName } from "./consts";

function buildChildImage() : Promise<boolean> {
    return new Promise(solve => {
        exec(`docker build -t ${childImageName} .`, {
            cwd: "./datas/ujs-child/template-docker"
        }, (error, stdout, stderr) => {
            solve(!error);
        });
    });
}

export default buildChildImage;