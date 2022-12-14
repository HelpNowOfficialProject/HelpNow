import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ColorModeScript } from "@chakra-ui/react";
import TimeAgo from "javascript-time-ago";
import pl from "javascript-time-ago/locale/pl.json";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
TimeAgo.addDefaultLocale(pl);
TimeAgo.addLocale(pl);
root.render(
  <React.StrictMode>
    <ColorModeScript initialColorMode={"dark"} />
    <App />
  </React.StrictMode>
);

localStorage.setItem("chakra-ui-color-mode", "dark");

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
