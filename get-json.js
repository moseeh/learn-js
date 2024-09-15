async function getJSON(path = '', params = {}) {
  // Build the URL with query parameters
  const url = `${path}?${Object.keys(params)
    .map(
      (key) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(params[key]).replace(/%20/g, '+')}`
    )
    .join('&')}`;

  // Fetch the URL and handle response
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}: ${response.statusText}`);
  }

  const res = await response.json();

  // If API returned an error, throw it directly
  if (res.error) {
    throw new Error(res.error);
  }

  return res.data;  // Return the data
}
