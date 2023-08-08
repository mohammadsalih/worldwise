import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from "react";

import {
  fetchData,
  deleteData,
  postData,
  API,
} from "../helpers/Helpers";

const CitiesContext = createContext();

const initialState = {
  cities: [],
  currentCity: {},
  isLoading: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };

    case "cities/loaded":
      return { ...state, isLoading: false, cities: action.payload };

    case "city/loaded":
      return {
        ...state,
        isLoading: false,
        currentCity: action.payload,
      };

    default:
      throw new Error("Invalid action");
  }
}

function CitiesProvider({ children }) {
  const [{ cities, isLoading, currentCity }, dispatch] = useReducer(
    reducer,
    initialState
  );

  async function loadData(actionType, getId, deleteId, data) {
    dispatch({ type: "loading" });

    if (deleteId) {
      await deleteData(API, "cities", deleteId);
    }

    if (data) {
      await postData(API, "cities", data);
    }

    if (getId) {
      const response = await fetchData(API, "cities", getId);
      dispatch({ type: actionType, payload: response });
      return;
    }

    const response = await fetchData(API, "cities");
    dispatch({ type: actionType, payload: response });
  }

  const getCity = useCallback(
    async function getCity(id) {
      if (id === currentCity.id) return;

      loadData("city/loaded", id);
    },
    [currentCity.id]
  );

  async function addCity(data) {
    loadData("cities/loaded", null, null, data);
  }

  async function deleteCity(id) {
    loadData("cities/loaded", null, id);
  }

  useEffect(function () {
    async function getCities() {
      loadData("cities/loaded");
    }

    getCities();
  }, []);

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        dispatch,
        getCity,
        addCity,
        deleteCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);

  if (context === undefined)
    throw new Error(
      "Cities context was used outside of CitiesProvider"
    );

  return context;
}

export { CitiesProvider, useCities };
