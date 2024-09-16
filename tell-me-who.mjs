import fs from "fs/promises"

let arg = process.argv[2]

if (arg === undefined) {
    arg = process.argv[1]
}

const data = await fs.readdir(arg, "utf8")

let arr = []

for (let i = 0; i <= data.length -1; i++) {
    let s = data[i].trimEnd(".json")
    let a = s.split("_")
    arr.push(a[1]+ " " + a[0])
}

arr.sort()

for (let i = 0; i <= arr.length-1; i++) {
    console.log(String(i+1)+ ". "+ arr[i])
}