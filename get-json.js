async function getJSON(path, params = {}) {
  try {
    // Check if the path is a valid full URL or a relative path
    const url = path.startsWith('http') ? new URL(path) : new URL(path, 'http://localhost');

    // Append query parameters
    Object.keys(params).forEach((key) => url.searchParams.append(key, params[key]));

    // Make the request
    const response = await fetch(url);

    // Check for response status
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}: ${response.statusText}`);
    }

    // Parse the JSON response
    let jsonData;
    try {
      jsonData = await response.json();
    } catch (e) {
      throw new Error("Failed to parse JSON response");
    }

    // Handle API errors or missing data
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
