import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";
import RecoilizeDebugger from "recoilize";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <RecoilRoot>
      <RecoilizeDebugger />
      <App />
    </RecoilRoot>
  </BrowserRouter>
);
