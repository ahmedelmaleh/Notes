import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import Home from './components/Home/Home'
import Login from './components/Login/Login'
import Register from './components/Register/Register'
import ProtectedRouter from './components/ProtectedRoute/ProtectedRoute'
import { UserProvider } from './Context/UserContext'
import NoteContextProvider from './Context/NoteContext'

export default function App() {
  const routers=createBrowserRouter([
    {
    path:"",element:<ProtectedRouter>
      <Layout/>
    </ProtectedRouter>,children:[{
      index:true,element:<Home/>
    }]
  },
{path:"/login",element:<Login/>},
{path:"/signup",element:<Register/>},




])
  return (
    <>
    <UserProvider>
    <NoteContextProvider>
    <RouterProvider router={routers}></RouterProvider>
    </NoteContextProvider>
    </UserProvider>
    
    </>
  )
}
