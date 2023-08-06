import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { fetchData, API } from "../helpers/Helpers";

const CitiesContext = createContext();

function CitiesProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [currentCity, setCurrentCity] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  async function fetchCities() {
    setCities(await fetchData(API, setIsLoading, "cities"));
  }
  async function getCity(id) {
    setCurrentCity(await fetchData(API, setIsLoading, "cities", id));
  }

  useEffect(function () {
    fetchCities();
  }, []);

  return (
    <CitiesContext.Provider
      value={{ cities, isLoading, currentCity, getCity }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);

  if (context === undefined)
    throw new Error(
      "post context was used outside of of post provider"
    );

  return context;
}

export { CitiesProvider, useCities };
