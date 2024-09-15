async function getJSON(path, params = {}) {
  const url = new URL(path);

  Object.keys(params).forEach((key) => 
    url.searchParams.append(key, params[key])
  );
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}: ${response.statusText}`);
  }
  const jsonData = await response.json();
  if (jsonData.error) {
    throw new Error(`API Error: ${jsonData.error}`);
  }
  if (jsonData.data) {
    return jsonData.data;
  } else {
    throw new Error("Invalid response format: No 'data' field in JSON");
  }
}
