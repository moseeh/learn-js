// Import required modules
import http from 'http';
import fs from 'fs';
import path from 'path';
const PORT = 5000;

const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'application/json');
  const guestName = req.url.substring(1);
  
  if (!guestName) {
    res.writeHead(404);
    res.end(JSON.stringify({ error: 'guest not found' }));
    return;
  }
  const filePath = path.join('guests', `${guestName}.json`);
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      if (err.code === 'ENOENT') {
        res.writeHead(404);
        res.end(JSON.stringify({ error: 'guest not found' }));
      } else {
        res.writeHead(500);
        res.end(JSON.stringify({ error: 'server failed' }));
      }
    } else {
      res.writeHead(200);
      res.end(data);
    }
  });
});
server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
