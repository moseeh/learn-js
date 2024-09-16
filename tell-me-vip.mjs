import fs from "fs/promises";
import path from "path";

let arg = process.argv[2] || process.argv[1];

async function saidYes(filePath) {
  try {
    const data = await fs.readFile(filePath, "utf8");
    const jsonData = JSON.parse(data);
    return jsonData.answer === "yes";
  } catch (error) {
    // If the file doesn't exist or can't be read, we'll just return false
    return false;
  }
}

async function main() {
  try {
    // Check if the directory exists
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

    // Remove the trailing newline
    output = output.trim();

    console.log(output);
    return output;  // Return the output for testing purposes

  } catch (error) {
    if (error.code === 'ENOENT') {
      // Directory doesn't exist, return an empty string
      return '';
    }
    console.error("An error occurred:", error);
    throw error;  // Re-throw the error for the test to catch
  }
}

// Only run main if this script is run directly (not imported)
if (require.main === module) {
  main().catch(error => console.error("An error occurred:", error));
}

// Export main for testing purposes
export { main };