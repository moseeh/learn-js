import fs from "fs/promises";

let arg = process.argv[2];
if (arg === undefined) {
  arg = process.argv[1];
}

const data = await fs.readdir(arg, "utf8");
let arr = [];

for (let i = 0; i <= data.length - 1; i++) {
  if (saidYes(data[i])) {
    let s = data[i].replace(/\.json$/, "");
    let a = s.split("_");
    arr.push(a[1] + " " + a[0]);
  }
}

arr.sort();
let s = ""

for (let i = 0; i <= arr.length - 1; i++) {
  s += String(i + 1) + ". " + arr[i] + "\n";
}

fs.writeFile("vip.txt", s)

function saidYes(filename) {
    const data = fs.readFile(filename, "utf8")
    const jsonData = JSON.parse(data)
    return jsonData.answer === "yes"
}
