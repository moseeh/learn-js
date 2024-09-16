import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let arg = process.argv[2] || process.argv[1];

async function saidYes(filePath) {
  try {
    const data = await fs.readFile(filePath, "utf8");
    const jsonData = JSON.parse(data);
    return jsonData.answer === "yes";
  } catch (error) {
    return false;
  }
}

async function main() {
  try {
    await fs.access(arg);
    
    const data = await fs.readdir(arg, "utf8");
    let arr = [];

    for (let file of data) {
      if (path.extname(file).toLowerCase() === '.json') {
        const filePath = path.join(arg, file);
        if (await saidYes(filePath)) {
          let s = file.replace(/\.json$/, "");
          let [lastName, firstName] = s.split("_");
          arr.push(`${firstName} ${lastName}`);
        }
      }
    }

    arr.sort();

    let output = '';
    arr.forEach((name, index) => {
      output += `${index + 1}. ${name}\n`;
    });

    output = output.trim();

    console.log(output);
    return output;

  } catch (error) {
    if (error.code === 'ENOENT') {
      return '';
    }
    console.error("An error occurred:", error);
    throw error;
  }
}

// Use top-level await instead of IIFE
if (import.meta.url === `file://${__filename}`) {
  try {
    await main();
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

export { main };