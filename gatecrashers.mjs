import http from "http";
import fs from "fs/promises";
import path from "path";

const PORT = 5000;
const ALLOWED_USERS = {
  "Caleb_Squires": "abracadabra",
  "Tyrique_Dalton": "abracadabra",
  "Rahima_Young": "abracadabra"
};
const GUESTS_DIR = process.env.GUESTS_DIR || path.join(process.cwd(), "guests");

const server = http.createServer(async (req, res) => {
  if (req.method !== "POST") return sendResponse(res, 404, { error: "not found" });

  const authHeader = req.headers["authorization"];
  if (!authHeader || !validateAuth(authHeader)) {
    return sendResponse(res, 401, { error: "Authorization Required" }, { "WWW-Authenticate": "Basic" });
  }

  const guestName = decodeURIComponent(new URL(req.url, `http://${req.headers.host}`).pathname.slice(1));
  if (!guestName) return sendResponse(res, 400, { error: "bad request" });

  try {
    const body = await getRequestBody(req);
    const data = JSON.parse(body);

    await fs.mkdir(GUESTS_DIR, { recursive: true });
    await fs.writeFile(path.join(GUESTS_DIR, `${guestName}.json`), JSON.stringify(data, null, 2), "utf-8");

    sendResponse(res, 200, data);
  } catch (err) {
    sendResponse(res, 500, { error: "server failed" });
  }
});

server.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));

function validateAuth(authHeader) {
  const [username, password] = Buffer.from(authHeader.split(" ")[1], "base64").toString("utf8").split(":");
  return ALLOWED_USERS[username] === password;
}

function sendResponse(res, status, data, headers = {}) {
  res.writeHead(status, { "Content-Type": "application/json", ...headers });
  res.end(JSON.stringify(data));
}

function getRequestBody(req) {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", chunk => body += chunk);
    req.on("end", () => resolve(body));
    req.on("error", reject);
  });
}