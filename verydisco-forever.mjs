import fs from "fs/promises";

const arg = process.argv[2];
let arr = arg.split(" ");
let arr1 = [];
for (let i = 0; i <= arr.length - 1; i++) {
  let l = arr[i].length;
  let le = Math.round(l / 2);
  arr1.push(arr[i].slice(le) + arr[i].slice(0, le));
}
let s = arr1.join(" ");

fs.writeFile("output.txt", s)
  .then(() => console.log("written successfully"))
  .catch((err) => console.error(err));
