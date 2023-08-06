export async function fetchData(API, setIsLoading, path, id) {
  const URL = `${API}${path ? `/${path}` : ""}${id ? `/${id}` : ""}`;
  const controller = new AbortController();

  try {
    if (setIsLoading) setIsLoading(true);
    const response = await fetch(URL, { signal: controller.signal });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch data from ${URL}. Status: ${response.status}`
      );
    }

    const data = await response.json();

    if (!data || typeof data !== "object") {
      throw new Error("Invalid data received from the server.");
    }

    return data;
  } catch (error) {
    if (error.name !== "AbortError") {
      console.error(error.message);
      throw error;
    }
  } finally {
    if (setIsLoading) setIsLoading(false);
  }
}

export async function getLocationData(lat, lng) {
  // First, get the country code using the provided lat and lng
  const geoCodeUrl = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`;

  try {
    // Fetch data from the reverse geocode API
    const response = await fetch(geoCodeUrl);
    const geoData = await response.json();

    // Extract the country code from the API response
    const countryCode = geoData.countryCode;

    // Now, get the country flag emoji using the country code
    const countryFlagUrl = `https://restcountries.com/v2/alpha/${countryCode}`;

    // Fetch data from the country info API
    const flagResponse = await fetch(countryFlagUrl);
    const countryData = await flagResponse.json();

    // Extract the country flag emoji from the API response
    const countryFlagEmoji = countryData.flags.emoji;

    // Get the current date and time
    const date = new Date().toISOString();

    // Create the object with the required data
    const locationData = {
      cityName: geoData.city,
      country: geoData.countryName,
      emoji: countryFlagEmoji,
      date,
      position: {
        lat,
        lng,
      },
      id: Date.now(),
    };

    return locationData;
  } catch (error) {
    // Handle any errors that may occur during the API request
    console.error("Error fetching data:", error);
    return null;
  }
}

export const API = "http://localhost:9000";
