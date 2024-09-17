import fs from "fs/promises";
import { join } from "path";

let arg = process.argv[2];
if (arg === undefined) {
  arg = process.argv[1];
}

try {
  const data = await fs.readdir(arg, "utf8");
  let arr = [];

  for (let i = 0; i < data.length; i++) {
    if (data[i].endsWith('.json') && await saidYes(join(arg, data[i]))) {  // Check if file is JSON and 'yes'
      let s = data[i].replace(/\.json$/, "");
      let a = s.split("_");
      arr.push(a[1] + " " + a[0]);
    }
  }

  arr.sort();

  if (arr.length === 0) {
    console.log('');  // Print nothing if no matches found
  } else {
    for (let i = 0; i < arr.length; i++) {
      console.log(String(i + 1) + ". " + arr[i]);
    }
  }
} catch (err) {
  console.error("Error:", err);
}

async function saidYes(filename) {
  try {
    const data = await fs.readFile(filename, "utf8");
    const jsonData = JSON.parse(data);
    return jsonData.answer === "yes";
  } catch (err) {
    console.error("Error reading/parsing file:", filename, err);
    return false;  // Return false if the file can't be read or parsed
  }
}
