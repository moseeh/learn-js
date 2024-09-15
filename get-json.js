async function getJSON(path, params = {}) {
  try {
    const url = new URL(path, window.location.origin);
    Object.keys(params).forEach((key) => url.searchParams.append(key, params[key]));
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}: ${response.statusText}`);
    }
    let jsonData;
    try {
      jsonData = await response.json();
    } catch (e) {
      throw new Error("Failed to parse JSON response");
    }
    if (jsonData.error) {
      throw new Error(`API Error: ${jsonData.error}`);
    }
    if (jsonData.data) {
      return jsonData.data;
    } else {
      throw new Error("Invalid response format: No 'data' field in JSON");
    }
  } catch (error) {
    console.error("Error in getJSON:", error);
    throw error;
  }
}
