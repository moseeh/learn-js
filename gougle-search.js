async function queryServers(serverName, q) {
  const mainServer = getJSON(`/${serverName}?q=${q}`);
  const backupServer = getJSON(`/${serverName}_backup?q=${q}`);
  
  return Promise.race([mainServer, backupServer]);
}

async function gougleSearch(q) {
  const servers = ['web', 'image', 'video'];
  
  const searchPromises = servers.map(server => queryServers(server, q));
  
  try {
    const results = await Promise.all(searchPromises.map(p => Promise.race([
      p,
      new Promise((_, reject) => setTimeout(() => reject(new Error('timeout')), 80))
    ])));
    
    return Object.fromEntries(servers.map((server, index) => [server, results[index]]));
  } catch (error) {
    if (error.message === 'timeout') {
      return error;
    }
    throw error;
  }
}