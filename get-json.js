async function getJSON(path, params = {}) {
  // Build the URL with query parameters
  const url = `${path}?${Object.keys(params)
    .map(
      (key) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(params[key]).replace(/%20/g, '+')}`
    )
    .join('&')}`;

  // Fetch the URL and handle the response
  const response = await fetch(url);

  // Throw an error if the response is not OK, using only the status text
  if (!response.ok) {
    throw new Error(response.statusText);  // Only throw statusText
  }

  // Parse the JSON body
  const res = await response.json();

  // If the response contains an "error" property, throw the error
  if (res.error) {
    throw new Error(res.error);
  }

  // Otherwise, return the "data" property
  return res.data;
}
