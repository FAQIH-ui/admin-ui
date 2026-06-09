import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import Parent from "./latihan/Parent.jsx";
import { CounterContextProvider } from "./context/counterContext.jsx";
import { ThemeContextProvider } from "./context/themeContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeContextProvider>
        <App />
    </ThemeContextProvider>
  </React.StrictMode>,
);