import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import InsertBook from './components/InsertBook.jsx'
import AllBooks from './components/AllBooks.jsx'
import UpdateBook from './components/UpdateBook.jsx'
import ViewBook from './components/ViewBook.jsx'
import BookImg from './components/BookImg.jsx'

const route = createBrowserRouter([{
  path:'/',
  element:<App/>,
  children:[
    {path:'/',element:<AllBooks/>},
    {path:'/insert',element:<InsertBook/>},
    {path:'/update/:id',element:<UpdateBook/>},
    {path:'/view/:id',element:<ViewBook/>},
    {path:'/image/:id',element:<BookImg/>}

  ]
}])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={route} />
  </React.StrictMode>
)
