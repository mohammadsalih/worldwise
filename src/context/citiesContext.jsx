/* eslint-disable */
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";

// Create context
const CitiesContext = createContext();

// Create a base URL for the API
const BASE_URL = "http://localhost:8000";

const initialState = {
  cities: [],
  currentCity: {},
  isLoading: false,
  error: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };

    case "cities/loaded":
      return {
        ...state,
        cities: action.payload,
        isLoading: false,
        error: null,
      };

    case "city/loaded":
      return {
        ...state,
        currentCity: action.payload,
        isLoading: false,
        error: null,
      };

    case "city/created":
      return {
        ...state,
        cities: [...state.cities, action.payload],
        isLoading: false,
        error: null,
      };

    case "city/deleted":
      return {
        ...state,
        cities: state.cities.filter((city) => city.id !== action.payload),
        isLoading: false,
      };

    case "rejected":
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

// Provider component
function CitiesContextProvider({ children }) {
  const [{ cities, currentCity, isLoading, error }, dispatch] = useReducer(
    reducer,
    initialState
  );

  const countries = cities.reduce(
    (acc, cur) =>
      acc.map((item) => item.country).includes(cur.country)
        ? acc
        : (acc = [...acc, cur]),
    []
  );

  useEffect(() => {
    async function callBack() {
      dispatch({ type: "loading" });

      try {
        const response = await fetch(`${BASE_URL}/cities`);

        if (!response.ok)
          throw new Error(`HTTP error! Status: ${response.status}`);

        const data = await response.json();

        dispatch({ type: "cities/loaded", payload: data });
      } catch (error) {
        dispatch({
          type: "rejected",
          payload: `something went wrong with the connection :  ${error.message}`,
        });
      }
    }
    callBack();
  }, []);

  const getCityById = useCallback(async function (id) {
    dispatch({ type: "loading" });

    try {
      const response = await fetch(`${BASE_URL}/cities/${id}`);

      if (!response.ok)
        throw new Error(`HTTP error! Status: ${response.status}`);

      const data = await response.json();

      dispatch({ type: "city/loaded", payload: data });
    } catch {
      dispatch({
        type: "rejected",
        payload: `something went wrong with the connection :  ${error.message}`,
      });
    }
  }, []);

  async function createCity(newCity) {
    dispatch({ type: "loading" });

    try {
      const response = await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCity),
      });

      if (!response.ok)
        throw new Error(`HTTP error! Status: ${response.status}`);

      const data = await response.json();

      dispatch({ type: "city/created", payload: data });
    } catch (error) {
      dispatch({
        type: "rejected",
        payload: `something went wrong with the connection :  ${error.message}`,
      });
    }
  }

  const deleteCity = async (id) => {
    dispatch({ type: "loading" });

    try {
      const response = await fetch(`${BASE_URL}/cities/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete");

      dispatch({ type: "city/deleted", payload: id });

      console.log("Deleted successfully");
    } catch (error) {
      dispatch({
        type: "rejected",
        payload: `something went wrong with the connection :  ${error.message}`,
      });
    }
  };

  return (
    <CitiesContext.Provider
      value={{
        cities,
        countries,
        currentCity,
        isLoading,
        error,

        getCityById,
        createCity,
        deleteCity,
      }}
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
      "useCitiesContext must be used within a CitiesContextProvider"
    );

  return context;
}

// Export provider and hook
export { CitiesContextProvider, useCitiesContext };
