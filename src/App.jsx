import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import HomePage from "./pages/HomePage/HomePage.jsx";
import PricingPage from "./pages/PricingPage/PricingPage.jsx";
import ProductPage from "./pages/ProductPage/ProductPage.jsx";
import LoginPage from "./pages/LoginPage/LoginPage.jsx";
import AppPage from "./pages/AppPage/AppPage.jsx";
import PageNotFound from "./pages/PageNotFound/PageNotFound.jsx";
import CityList from "./components/CityList/CityList.jsx";
import City from "./components/City/City.jsx";
import CountryList from "./components/CountryList/CountryList.jsx";
import Form from "./components/Form/Form.jsx";
import { CitiesProvider } from "./contexts/CitiesContext.jsx";
import { FakeAuthProvider } from "./contexts/FakeAuthContext.jsx";
import ProtectedRoute from "./pages/ProtectedRoute/ProtectedRoute.jsx";

function App() {
  return (
    <FakeAuthProvider>
      <CitiesProvider>
        <BrowserRouter>
          <Routes>
            <Route index element={<HomePage />} />

            <Route path="pricing" element={<PricingPage />} />
            <Route path="product" element={<ProductPage />} />
            <Route path="login" element={<LoginPage />} />

            <Route
              path="app"
              element={
                <ProtectedRoute>
                  <AppPage />
                </ProtectedRoute>
              }
            >
              <Route
                index
                element={<Navigate replace to="cities" />}
              />

              <Route path="cities" element={<CityList />} />
              <Route path="cities/:id" element={<City />} />
              <Route path="countries" element={<CountryList />} />

              <Route path="form" element={<Form />} />
            </Route>

            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
      </CitiesProvider>
    </FakeAuthProvider>
  );
}

export default App;
