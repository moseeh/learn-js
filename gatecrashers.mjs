import http from 'http';
import fs from 'fs/promises';
import path from 'path';

const PORT = 5000;
const GUESTS_DIR = 'guests';

const AUTHORIZED_USERS = {
  'Caleb_Squires': 'abracadabra',
  'Tyrique_Dalton': 'abracadabra',
  'Rahima_Young': 'abracadabra'
};

const server = http.createServer(async (req, res) => {
  res.setHeader('Content-Type', 'application/json');

  const authHeader = req.headers.authorization;
  if (!authHeader || !isAuthorized(authHeader)) {
    return sendResponse(res, 401, 'Authorization Required');
  }

  if (req.method !== 'POST') {
    return sendResponse(res, 500, { error: 'server failed' });
  }

  const guestName = req.url.substring(1);
  if (!guestName) {
    return sendResponse(res, 500, { error: 'server failed' });
  }

  try {
    await fs.mkdir(GUESTS_DIR, { recursive: true });

    const body = await getRequestBody(req);
    let guestData;
    try {
      guestData = JSON.parse(body);
    } catch (jsonError) {
      return sendResponse(res, 500, { error: 'server failed' });
    }

    const filePath = path.join(GUESTS_DIR, `${guestName}.json`);
    
    // Check if file already exists
    try {
      await fs.access(filePath);
      // If no error is thrown, file exists
      return sendResponse(res, 500, { error: 'server failed' });
    } catch {
      // File doesn't exist, proceed with writing
      await fs.writeFile(filePath, JSON.stringify(guestData, null, 2));
    }

    sendResponse(res, 200, guestData);
  } catch (err) {
    console.error('Error:', err);
    sendResponse(res, 500, { error: 'server failed' });
  }
});

function isAuthorized(authHeader) {
  const base64Credentials = authHeader.split(' ')[1];
  const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
  const [username, password] = credentials.split(':');

  return AUTHORIZED_USERS[username] === password;
}

function sendResponse(res, statusCode, data) {
  res.writeHead(statusCode);
  res.end(typeof data === 'string' ? data : JSON.stringify(data));
}

function getRequestBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => body += chunk.toString());
    req.on('end', () => resolve(body));
    req.on('error', reject);
  });
}

server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});