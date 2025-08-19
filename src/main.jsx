import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";   // ✅ import router
import store from "./store.js";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter basename="/PakClassified">   {/* ✅ fix base path */}
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
