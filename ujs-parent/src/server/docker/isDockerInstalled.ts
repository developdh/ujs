
import { exec } from "child_process";

function isDockerInstalled() : Promise<boolean> {
    return new Promise(solve => {
        exec("docker version", (error, stdout, stderr) => {
            solve(!error);
        });
    });
}

export default isDockerInstalled;