import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { applicationRouter } from "./routing";
import "bootstrap/dist/css/bootstrap.min.css";
import "./presentation/assets/styles.css";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <div className="MainContainer">
      <RouterProvider router={applicationRouter} />
    </div>
  </React.StrictMode>
);
