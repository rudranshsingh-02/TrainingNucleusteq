import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";
import MoreDetails from './components/MoreDetials.jsx'
import Login from './Pages/Login.jsx';
import Register from './Pages/Register.jsx';
import PrivateRoute from './Pages/PrivaterRoute.jsx'
import Publicroute from './Pages/PublicRoute.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element : (<p>hello</p>)
  },
  {
    path: "/private",
    element: (
      <PrivateRoute>
        <App />
      </PrivateRoute>
    )
  },
  {
    path: "/moredetails",
    element: <MoreDetails />
  },
  {
    path:"/login",
    element: (
      <Publicroute>
        <Login />
      </Publicroute>
    )
  },
  {
    path:"/register",
    element: (
      <Publicroute>
        <Register />
      </Publicroute>
    ) 
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)   