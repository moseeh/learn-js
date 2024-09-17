import fs from "fs/promises";

// Get the arguments
let file = process.argv[2];   // Input file
let keyword = process.argv[3];  // encode or decode
let filename = process.argv[4];  // Optional output filename

// Read the file
const fileData = await fs.readFile(file, "utf8");

if (keyword === "encode") {
  // Encode the content to Base64
  if (filename === undefined) {
    filename = "cypher.txt";
  }
  const base64data = Buffer.from(fileData).toString("base64");  // Convert to Base64
  await fs.writeFile(filename, base64data);  // Write the encoded string to file
} else if (keyword === "decode") {
  // Decode the Base64 content
  if (filename === undefined) {
    filename = "clear.txt";
  }
  const decodedData = Buffer.from(fileData, "base64").toString("utf8");  // Decode from Base64
  await fs.writeFile(filename, decodedData);  // Write the decoded string to file
} else {
  console.error("Invalid keyword. Use 'encode' or 'decode'.");
}
