import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Link, RouterProvider, createBrowserRouter } from "react-router-dom";
import { GetLocation } from "./components/GetLocation/GetLocationComponent.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div className="body">
        <Link to="geo">Set profile info</Link>
        
        <App />
      </div>
    ),
  },
  {
    path: "geo",
    element: (
      <>
        <Link to="/">Search weather</Link>
        
        <GetLocation />
      </>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
