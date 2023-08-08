import { Suspense, lazy } from "react";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import { CitiesProvider } from "./contexts/CitiesContext.jsx";
import { FakeAuthProvider } from "./contexts/FakeAuthContext.jsx";

import ProtectedRoute from "./pages/ProtectedRoute/ProtectedRoute.jsx";

import CityList from "./components/CityList/CityList.jsx";
import City from "./components/City/City.jsx";
import CountryList from "./components/CountryList/CountryList.jsx";
import Form from "./components/Form/Form.jsx";
import SpinnerFullPage from "./components/SpinnerFullPage/SpinnerFullPage.jsx";

// import HomePage from "./pages/HomePage/HomePage.jsx";
// import PricingPage from "./pages/PricingPage/PricingPage.jsx";
// import ProductPage from "./pages/ProductPage/ProductPage.jsx";
// import LoginPage from "./pages/LoginPage/LoginPage.jsx";
// import AppPage from "./pages/AppPage/AppPage.jsx";
// import PageNotFound from "./pages/PageNotFound/PageNotFound.jsx";

const HomePage = lazy(() => import("./pages/HomePage/HomePage.jsx"));
const PricingPage = lazy(() =>
  import("./pages/PricingPage/PricingPage.jsx")
);
const ProductPage = lazy(() =>
  import("./pages/ProductPage/ProductPage.jsx")
);
const LoginPage = lazy(() =>
  import("./pages/LoginPage/LoginPage.jsx")
);
const AppPage = lazy(() => import("./pages/AppPage/AppPage.jsx"));
const PageNotFound = lazy(() =>
  import("./pages/PageNotFound/PageNotFound.jsx")
);

function App() {
  return (
    <FakeAuthProvider>
      <CitiesProvider>
        <BrowserRouter>
          <Suspense fallback={<SpinnerFullPage />}>
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
          </Suspense>
        </BrowserRouter>
      </CitiesProvider>
    </FakeAuthProvider>
  );
}

export default App;
