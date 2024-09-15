async function queryServers(serverName, q) {
  const mainServer = getJSON(`/${serverName}?q=${q}`);
  const backupServer = getJSON(`/${serverName}_backup?q=${q}`);
  
  return Promise.race([mainServer, backupServer]);
}

async function gougleSearch(q) {
  const servers = ['web', 'image', 'video'];
  
  const timeoutPromise = new Promise((_, reject) => {
    setTimeout(() => reject(new Error('timeout')), 80);
  });
  
  const searchPromise = Promise.all(
    servers.map(async server => {
      const result = await queryServers(server, q);
      return [server, result];
    })
  ).then(Object.fromEntries);
  
  try {
    return await Promise.race([searchPromise, timeoutPromise]);
  } catch (error) {
    if (error.message === 'timeout') {
      return error;
    }
    throw error;
  }
}