import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { GlobalSettingsProvider } from "./providers/globalSettings.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <GlobalSettingsProvider>
    <App />
  </GlobalSettingsProvider>
);
