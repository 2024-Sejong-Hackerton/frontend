import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import LoginPage from "./pages/LoginPage"
import GetTTPage from './pages/GetTTPage'
import "./index.css";
import App from './App'
import MainPage from './pages/MainPage';

const router = createBrowserRouter(
  [
    {
      path:"/test",
      element:<App/>
    },
    {
      path: "/login",
      element: <LoginPage />,
    },
    {
      path: "/timetable",
      element: <GetTTPage/>
    },
    {
      path: "/main",
      element: <MainPage/>
    }
  ]
)


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
