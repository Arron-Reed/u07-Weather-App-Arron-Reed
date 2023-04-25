import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Link, RouterProvider, createBrowserRouter } from "react-router-dom"
import { GetLocation } from './components/GetLocation.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Link to="geo">Set profile info</Link>
        <hr></hr>
        <App />
      </>
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
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
