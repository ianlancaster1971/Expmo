import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import "./index.css";
import App from "./App.jsx";
import { EventsProvider } from "./context/EventsContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <EventsProvider>
          <App />
        </EventsProvider>
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>,
);
