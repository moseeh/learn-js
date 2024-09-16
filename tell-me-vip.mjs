import fs from "fs/promises";
import path from "path";

let arg = process.argv[2] || process.argv[1];

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
  try {
    const data = await fs.readdir(arg, "utf8");
    const jsonFiles = data.filter(file => path.extname(file).toLowerCase() === '.json');

    const results = await Promise.all(
      jsonFiles.map(async (file) => {
        const filePath = path.join(arg, file);
        if (await saidYes(filePath)) {
          let s = file.replace(/\.json$/, "");
          let [lastName, firstName] = s.split("_");
          return `${firstName} ${lastName}`;
        }
        return null;
      })
    );

    const arr = results.filter(Boolean).sort();

    arr.forEach((name, index) => {
      console.log(`${index + 1}. ${name}`);
    });
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

main();