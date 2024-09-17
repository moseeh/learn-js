import fs from "fs/promises";
import { join } from "path";

let arg = process.argv[2];
if (arg === undefined) {
  arg = process.argv[1];
}

try {
  const data = await fs.readdir(arg, "utf8");
  let arr = [];

  for (let i = 0; i <= data.length - 1; i++) {
    if (await saidYes(join(arg, data[i]))) {  // Use await to handle async function
      let s = data[i].replace(/\.json$/, "");
      let a = s.split("_");
      arr.push(a[1] + " " + a[0]);
    }
  }

  arr.sort();

  for (let i = 0; i <= arr.length - 1; i++) {
    console.log(String(i + 1) + ". " + arr[i]);
  }
} catch (err) {
  console.error("Error:", err);
}

async function saidYes(filename) {
  try {
    const data = await fs.readFile(filename, "utf8");  // Await the file read
    const jsonData = JSON.parse(data);
    return jsonData.answer === "yes";
  } catch (err) {
    console.error("Error reading/parsing file:", filename, err);
    return false;  // Return false if there's an error
  }
}
