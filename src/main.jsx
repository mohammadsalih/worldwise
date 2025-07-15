import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./main.css";

import App from "./App.jsx";
import { CitiesContextProvider } from "./context/citiesContext.jsx";
import { FakeAuthContextProvider } from "./context/FakeAuthContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <FakeAuthContextProvider>
      <CitiesContextProvider>
        <App />
      </CitiesContextProvider>
    </FakeAuthContextProvider>
  </StrictMode>
);
