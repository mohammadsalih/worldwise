import {
  BrowserRouter,
  Route,
  Routes,
} from 'react-router-dom';

import Homepage from './pages/Homepage';

import Login from './pages/Login';

import Product from './pages/Product';
import Pricing from './pages/Pricing';

import PageNotFound from './pages/PageNotFound';
import AppLayout from './pages/AppLayout';
import CityList from './components/CityList';
import { useEffect, useState } from 'react';
import CountryList from './components/CountryList';
import City from './components/City';

const BASE_URL = 'http://localhost:8000';

function App() {
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
    <BrowserRouter>
      <Routes>
        <Route
          index
          element={<Homepage />}
        />

        <Route
          path='product'
          element={<Product />}
        />
        <Route
          path='pricing'
          element={<Pricing />}
        />

        <Route
          path='login'
          element={<Login />}
        />

        <Route
          path='app'
          element={<AppLayout />}
        >
          <Route
            index
            element={
              <CityList
                cities={cities}
                isLoading={isLoading}
              />
            }
          />

          <Route
            path='cities'
            element={
              <CityList
                cities={cities}
                isLoading={isLoading}
              />
            }
          />

          <Route
            path='cities/:id'
            element={<City cities={cities} />}
          />

          <Route
            path='countries'
            element={
              <CountryList
                countries={countries}
                isLoading={isLoading}
              />
            }
          />
          <Route
            path='form'
            element={<p>add city form</p>}
          />
        </Route>

        <Route
          path='*'
          element={<PageNotFound />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
