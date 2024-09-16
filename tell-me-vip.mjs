import fs from "fs/promises";
import path from "path";

let arg = process.argv[2];
if (arg === undefined) {
  arg = process.argv[1];
}

async function saidYes(filePath) {
  try {
    const data = await fs.readFile(filePath, "utf8");
    const jsonData = JSON.parse(data);
    return jsonData.answer === "yes";
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error);
    return false;
  }
}

async function main() {
  const data = await fs.readdir(arg, "utf8");
  let arr = [];

  for (let i = 0; i <= data.length - 1; i++) {
    const filePath = path.join(arg, data[i]);
    if (await saidYes(filePath)) {
      let s = data[i].replace(/\.json$/, "");
      let a = s.split("_");
      arr.push(a[1] + " " + a[0]);
    }
  }

  arr.sort();

  for (let i = 0; i <= arr.length - 1; i++) {
    console.log(String(i + 1) + ". " + arr[i]);
  }
}

main().catch(error => console.error("An error occurred:", error));