import fs from "fs/promises";

let arg = process.argv[2]

if (arg === undefined) {
    arg = process.argv[1]
}

const data = await fs.readdir(arg, "utf8")

console.log(data.length)