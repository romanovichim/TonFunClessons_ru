import * as fs from "fs";
import { readFileSync } from "fs";
import process from "process";
import { Cell } from "ton-core";
import { compileFunc } from "@ton-community/func-js";

async function compileScript() {

    const compileResult = await compileFunc({
        targets: ["./contracts/main.fc"], 
        sources: (path) => readFileSync(path).toString("utf8"),
    });

    if (compileResult.status ==="error") {
        console.log("Error happend");
        process.exit(1);
    }

    const hexBoC = 'build/main.compiled.json';

    fs.writeFileSync(
        hexBoC,
        JSON.stringify({
            hex: Cell.fromBoc(Buffer.from(compileResult.codeBoc,"base64"))[0]
                .toBoc()
                .toString("hex"),
        })

    );
    
    console.log("Compiled, hexBoC:"+hexBoC);

}

compileScript();