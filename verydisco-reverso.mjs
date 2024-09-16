import fs from "fs/promises";

const arg = process.argv[2];

const data = await fs.readFile(arg, "utf8")

let arr = data.split(" ");
let arr1 = [];
for (let i = 0; i <= arr.length - 1; i++) {
  let l = arr[i].length;
  let le = Math.floor(l / 2);
  arr1.push(arr[i].slice(le) + arr[i].slice(0, le));
}
let s = arr1.join(" ");

console.log(s)