import {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

// Create context
const CitiesContext = createContext();

// Create a base URL for the API
const BASE_URL = 'http://localhost:8000';

// Provider component
function CitiesContextProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] =
    useState(false);

  const countries = cities.reduce(
    (acc, cur) =>
      acc
        .map((item) => item.country)
        .includes(cur.country)
        ? acc
        : (acc = [...acc, cur]),
    [],
  );

  useEffect(() => {
    async function callBack() {
      try {
        setIsLoading(true);

        const response = await fetch(
          `${BASE_URL}/cities`,
        );

        if (!response.ok)
          throw new Error(
            `HTTP error! Status: ${response.status}`,
          );

        const data = await response.json();

        setCities(data);
      } catch (error) {
        console.error(
          'something went wrong with the connection : ' +
            error,
        );
      } finally {
        setIsLoading(false);
      }
    }
    callBack();
  }, [setCities, setIsLoading]);

  return (
    <CitiesContext.Provider
      value={{ cities, countries, isLoading }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

// Custom hook to use context
function useCitiesContext() {
  const context = useContext(CitiesContext);

  if (!context)
    throw new Error(
      'useCitiesContext must be used within a CitiesContextProvider',
    );

  return context;
}

// Export provider and hook
export {
  CitiesContextProvider,
  useCitiesContext,
};
