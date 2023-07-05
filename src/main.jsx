import React from "react";
import ReactDOM from "react-dom/client";
import App from "./routes/App.jsx";
import "./index.css";
import { GlobalSettingsProvider } from "./providers/globalSettings.jsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./routes/Home.jsx";
import Averages from "./components/pages/Averages/Averages.jsx";
import Settings from "./routes/Settings.jsx";
import Profile from "./routes/Profile.jsx"

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {path: '/',
      element: <Home />},
      {path: '/averages',
      element: <Averages />},
      {path: '/settings',
      element: <Settings />},
      {path: '/profile',
      element: <Profile />}

    ]
  },
])

ReactDOM.createRoot(document.getElementById("root")).render(
  <GlobalSettingsProvider>
    <RouterProvider router={router} />
  </GlobalSettingsProvider>
);
