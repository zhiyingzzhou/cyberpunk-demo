import "@fontsource/orbitron/600.css";
import "@fontsource/orbitron/800.css";
import "@fontsource/jetbrains-mono/400.css";
import "@fontsource/jetbrains-mono/600.css";
import "@fontsource/share-tech-mono/400.css";

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import "./index.css";
import { ToastProvider } from "./state/toast";
import { UISettingsProvider } from "./state/uiSettings";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <UISettingsProvider>
      <ToastProvider>
        <BrowserRouter basename={import.meta.env.BASE_URL}>
          <App />
        </BrowserRouter>
      </ToastProvider>
    </UISettingsProvider>
  </React.StrictMode>,
);
