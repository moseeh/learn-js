import fs from "fs/promises";
import path from "path";

let arg = process.argv[2];
if (arg === undefined) {
  arg = process.argv[1];
}

try {
  const data = await fs.readdir(arg, "utf8");
  let arr = [];
  for (let i = 0; i < data.length; i++) {
    if (await saidYes(path.join(arg, data[i]))) {
      let s = data[i].replace(/\.json$/, "");
      let [lastName, firstName] = s.split("_");
      arr.push(`${firstName} ${lastName}`);
    }
  }
  arr.sort()

  let s = arr.map((name, index) => `${index + 1}. ${name}`).join("\n");

  await fs.writeFile("vip.txt", s);
  console.log(s); // Print the result to console
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
    return false;
  }
}
