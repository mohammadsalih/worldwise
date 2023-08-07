// Cleaned and optimized functions

export function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

async function fetchJsonFromApi(url, options = {}) {
  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(
        `Failed to fetch data from ${url}. Status: ${response.status}`
      );
    }

    return response.json();
  } catch (error) {
    console.error(error.message);
    throw error;
  }
}

export async function fetchData(API, path, id) {
  const URL = `${API}${path ? `/${path}` : ""}${id ? `/${id}` : ""}`;
  return fetchJsonFromApi(URL);
}

export async function postData(API, path, cityData) {
  const URL = `${API}/${path}`;
  const options = {
    method: "POST",
    body: JSON.stringify(cityData),
    headers: {
      "content-type": "application/json",
    },
  };
  return fetchJsonFromApi(URL, options);
}

export async function deleteData(API, path, id) {
  const URL = `${API}/${path}/${id}`;
  const options = { method: "DELETE" };
  return fetchJsonFromApi(URL, options);
}

export async function getLocationData(lat, lng) {
  try {
    const geoCodeUrl = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`;
    const geoData = await fetchJsonFromApi(geoCodeUrl);
    const countryCode = geoData.countryCode;
    const countryFlagUrl = `https://restcountries.com/v2/alpha/${countryCode}`;
    const countryData = await fetchJsonFromApi(countryFlagUrl);
    const countryFlagEmoji = countryData.flags.svg;
    const locationData = {
      cityName: geoData.city || geoData.locality,
      country: geoData.countryName,
      emoji: countryFlagEmoji,
    };
    return locationData;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}

// API constant remains unchanged
export const API = "http://localhost:9000";
