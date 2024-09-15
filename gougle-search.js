async function queryServers(serverName, q) {
    const url = `/${serverName}?q=${q}`;
    const backupUrl = `/${serverName}_backup?q=${q}`;
    return Promise.race([
        getJSON(url),
        getJSON(backupUrl)
    ]);
}

async function gougleSearch(q) {
    const servers = ['web', 'image', 'video'];
    const timeout = new Promise((_, reject) =>
        setTimeout(() => reject(new Error('timeout')), 80)
    );

    try {
        const results = await Promise.race([
            Promise.all(servers.map(server => queryServers(server, q))),
            timeout
        ]);

        return Object.fromEntries(servers.map((server, index) => [server, results[index]]));
    } catch (error) {
        if (error.message === 'timeout') {
            throw error;
        }
        throw error;
    }
}