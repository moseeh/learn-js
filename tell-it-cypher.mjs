import fs from "fs/promises";

let file = process.argv[2];
let keyword = process.argv[3];
let filename = process.argv[4];
const fileData = await fs.readFile(file);
if (keyword === "encode") {
  if (filename === undefined) {
    filename = "cypher.txt";
  }
  const base64data = fileData.toString("base64");
  await fs.writeFile(filename, base64data);
}

if (keyword === "decode") {
  if (filename === undefined) {
    filename = "clear.txt";
  }
  const fileData1 = Buffer.from(fileData, "base64").toString('utf8');
  await fs.writeFile(filename, fileData1);
}
