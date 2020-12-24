
import { exec } from "child_process";
import { childImageName } from "./consts";

function isChildImageBuilt() : Promise<boolean> {
    return new Promise(solve => {
        exec(`docker images`, (err, stdout, stderr) => {
            const lines = stdout.split("\n").map(v => v.trim());
            const isChildImageFound = lines.some(line => line.startsWith(childImageName));
            solve(isChildImageFound);
        });
    });
}

export default isChildImageBuilt;