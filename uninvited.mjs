import http from 'http';
import fs from 'fs/promises';
import path from 'path';

const PORT = 5000;

const server = http.createServer(async (req, res) => {
  res.setHeader('Content-Type', 'application/json');

  // Only handle POST requests
  if (req.method !== 'POST') {
    return sendError(res, 405, 'Method Not Allowed');
  }

  const guestName = req.url.substring(1);
  if (!guestName) {
    return sendError(res, 400, 'Guest name is required');
  }

  try {
    const body = await getRequestBody(req);
    const guestData = JSON.parse(body);

    const filePath = path.join('guests', `${guestName}.json`);
    await fs.writeFile(filePath, JSON.stringify(guestData, null, 2));

    res.writeHead(201);
    res.end(JSON.stringify(guestData));
  } catch (err) {
    console.error('Error:', err);
    sendError(res, 500, 'Server error');
  }
});

function sendError(res, statusCode, message) {
  res.writeHead(statusCode);
  res.end(JSON.stringify({ error: message }));
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