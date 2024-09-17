import http from "http";
import fs from "fs/promises";
import path from "path";

const PORT = 5000;
const allowedUsers = ["Caleb_Squires", "Tyrique_Dalton", "Rahima_Young"];
const password = "abracadabra";

// Use the environment variable GUESTS_DIR or default to 'guests'
const guestsDir = process.env.GUESTS_DIR || path.join(process.cwd(), "guests");
// console.log(`Using guests directory: ${guestsDir}`); // Debugging log

const server = http.createServer(async (req, res) => {
  try {
    // Only handle POST requests
    if (req.method !== "POST") {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "not found" }));
      return;
    }

    // Check for Authorization header
    const authHeader = req.headers["authorization"];
    if (!authHeader || !validateAuth(authHeader)) {
      res.writeHead(401, {
        "Content-Type": "application/json",
        "WWW-Authenticate": "Basic",
      });
      res.end(JSON.stringify({ error: "Authorization Required" }));
      return;
    }

    // Parse the URL to get the guest name
    const url = new URL(req.url, `http://${req.headers.host}`);
    const guestName = decodeURIComponent(url.pathname.slice(1)); // Remove leading '/'

    if (!guestName) {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "bad request" }));
      return;
    }

    // Collect the request body data
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
    });

    req.on("end", async () => {
      try {
        const contentType = req.headers["content-type"] || "";

        let data;
        if (contentType.includes("application/json") && body) {
          try {
            data = JSON.parse(body);
          } catch (err) {
            // If parsing fails, send a bad request response
            res.writeHead(400, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ error: "invalid JSON body" }));
            return;
          }
        } else {
          res.writeHead(400, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ error: "bad request" }));
          return;
        }

        // Ensure the 'guests' directory exists
        try {
          await fs.access(guestsDir);
        } catch (err) {
          // console.log(`Directory ${guestsDir} does not exist. Creating it...`); // Debugging log
          await fs.mkdir(guestsDir, { recursive: true });
        }

        // Write the data to the file as JSON
        const filePath = path.join(guestsDir, `${guestName}.json`);
        await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf-8");
        // console.log(`File created at: ${filePath}`); // Debugging log

        // Respond with the same data that was sent in the request
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(data));
      } catch (err) {
        // console.log("Error writing file:", err); // Debugging log
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "server failed" }));
      }
    });

    req.on("error", (err) => {
      // console.log("Request error:", err); // Debugging log
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "server failed" }));
    });
  } catch (err) {
    // console.log("General server error:", err); // Debugging log
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "server failed" }));
  }
});

server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

function validateAuth(authHeader) {
  const base64Credentials = authHeader.split(" ")[1];
  if (!base64Credentials) return false;

  const credentials = Buffer.from(base64Credentials, "base64").toString("utf8");
  const [username, passwd] = credentials.split(":");

  return allowedUsers.includes(username) && passwd === password;
}