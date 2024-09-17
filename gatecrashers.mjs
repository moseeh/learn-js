import http from "http";
import fs from "fs/promises";
import path from "path";

const PORT = 5000;
const allowedUsers = ["Caleb_Squires", "Tyrique_Dalton", "Rahima_Young"];
const password = "abracadabra";
const guestsDir = process.env.GUESTS_DIR || path.join(process.cwd(), "guests");

const server = http.createServer(async (req, res) => {
  if (req.method !== "POST") {
    return respond(res, 404, { error: "not found" });
  }

  const authHeader = req.headers["authorization"];
  if (!authHeader || !validateAuth(authHeader)) {
    return respond(res, 401, { error: "Authorization Required" }, {
      "WWW-Authenticate": "Basic",
    });
  }

  const guestName = decodeURIComponent(new URL(req.url, `http://${req.headers.host}`).pathname.slice(1));
  if (!guestName) return respond(res, 400, { error: "bad request" });

  let body = "";
  req.on("data", (chunk) => (body += chunk));

  req.on("end", async () => {
    try {
      const data = parseJSON(body, res);
      if (!data) return;
      await ensureDirExists(guestsDir);
      await fs.writeFile(path.join(guestsDir, `${guestName}.json`), JSON.stringify(data, null, 2), "utf-8");
      respond(res, 200, data);
    } catch {
      respond(res, 500, { error: "server failed" });
    }
  });

  req.on("error", () => respond(res, 500, { error: "server failed" }));
});

server.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));

function validateAuth(authHeader) {
  const [username, passwd] = Buffer.from(authHeader.split(" ")[1], "base64").toString("utf8").split(":");
  return allowedUsers.includes(username) && passwd === password;
}

function parseJSON(body, res) {
  try {
    return JSON.parse(body);
  } catch {
    respond(res, 400, { error: "invalid JSON body" });
  }
}

async function ensureDirExists(dir) {
  try {
    await fs.access(dir);
  } catch {
    await fs.mkdir(dir, { recursive: true });
  }
}

function respond(res, statusCode, data, headers = {}) {
  res.writeHead(statusCode, { "Content-Type": "application/json", ...headers });
  res.end(JSON.stringify(data));
}
