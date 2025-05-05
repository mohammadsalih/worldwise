import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import './main.css';

import App from './App.jsx';
import { CitiesContextProvider } from './context/citiesContext.jsx';

createRoot(
  document.getElementById('root'),
).render(
  <StrictMode>
    <CitiesContextProvider>
      <App />
    </CitiesContextProvider>
  </StrictMode>,
);
