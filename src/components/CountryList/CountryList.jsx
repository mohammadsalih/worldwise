import CountryItem from "../CountryItem/CountryItem";
import Message from "../Message/Message";
import Spinner from "../Spinner/Spinner";


import styles from "./CountryList.module.css";
import { useCities } from "../../contexts/CitiesContext";

function getUniqueCountries(citiesArray) {
  const countryMap = new Map();

  // Loop through the array and populate the countryMap
  citiesArray.forEach((city) => {
    const { country, emoji, id } = city;

    if (!countryMap.has(country)) {
      countryMap.set(country, { country, emoji, id });
    }
  });

  // Convert the Map values to an array to get the unique country objects
  const uniqueCountries = Array.from(countryMap.values());

  return uniqueCountries;
}

function CityList() {
  const { cities, isLoading } = useCities();

  if (isLoading) {
    return <Spinner />;
  }

  if (!cities.length)
    return (
      <Message message="Add your first city by clicking on a city on the map" />
    );

  const coutries = getUniqueCountries(cities);

  return (
    <ul className={styles.countryList}>
      {coutries.map((country) => (
        <CountryItem key={country.id} countryData={country} />
      ))}
    </ul>
  );
}

export default CityList;
