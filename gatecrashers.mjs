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

  // Check authentication
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

    const filePath = path.join(GUESTS_DIR, `${guestName}.json`);
    await fs.writeFile(filePath, body);

    let responseData;
    try {
      responseData = JSON.parse(body);
    } catch (jsonError) {
      responseData = body;
    }

    sendResponse(res, 201, responseData);
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