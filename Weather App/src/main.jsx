import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Link, RouterProvider, createBrowserRouter } from "react-router-dom"
import { GetLocation } from './components/GetLocationComponent.jsx'
import { GetForecast } from './components/GetForecastComponent.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div className="body">
        <Link to="geo">Set profile info</Link>
        <hr></hr>
        <App />
      </div>
    ),
  },
  {
    path: "geo",
    element: (
      <>
        <Link to="/">Search weather</Link>
        <hr></hr>
        <GetLocation />
      </>
    )
  },
  {
    path: "forecast",
    element: (
      <>
        <Link to="forecast">See the forecast</Link>
        <hr></hr>
        <GetForecast />
      </>
    ),
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)

