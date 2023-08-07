export function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export async function postData(API, path, cityData, setIsLoading) {
  const URL = `${API}/${path}`;

  try {
    if (setIsLoading) setIsLoading(true);

    const response = await fetch(URL, {
      method: "POST",
      body: JSON.stringify(cityData),
      headers: {
        "content-type": "application/json",
      },
    });

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
    console.error(error.message);
    throw error;
  } finally {
    if (setIsLoading) setIsLoading(false);
  }
}

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
  try {
    // First, get the country code using the provided lat and lng
    const geoCodeUrl = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`;

    // Fetch data from the reverse geocode API
    const response = await fetch(geoCodeUrl);

    // Check if the response is successful
    if (!response.ok) {
      throw new Error(
        `Failed to fetch data from reverse geocode API. Status: ${response.status}`
      );
    }

    const geoData = await response.json();

    // Extract the country code from the API response
    const countryCode = geoData.countryCode;

    // Now, get the country flag emoji using the country code
    const countryFlagUrl = `https://restcountries.com/v2/alpha/${countryCode}`;

    // Fetch data from the country info API
    const flagResponse = await fetch(countryFlagUrl);

    // Check if the response is successful
    if (!flagResponse.ok) {
      throw new Error(
        `Failed to fetch data from country info API. Status: ${flagResponse.status}`
      );
    }

    const countryData = await flagResponse.json();

    // Extract the country flag emoji from the API response
    const countryFlagEmoji = countryData.flags.svg;

    // Create the object with the required data
    const locationData = {
      cityName: geoData.city || geoData.locality,
      country: geoData.countryName,
      emoji: countryFlagEmoji,
    };

    return locationData;
  } catch (error) {
    // Handle any errors that may occur during the API request
    console.error("Error fetching data:", error);
    return null;
  }
}

export const API = "http://localhost:9000";
