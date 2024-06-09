import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { Albums, MainPage, Posts, Root, UserDetail, Users } from './pages';
import { fetchUsers } from './pages/Users';
import { fetchUserLoader } from './pages/UserDetail';
import "./style.css"
import Favorites from './pages/Alt/Favorites';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children:[
      {
        index: true,
        element: <MainPage />,        
      },      
      {
        path: "users",
        element: <Users />,
        loader: fetchUsers,       
      },
      {
        path: "users/:userId",                        
        children: [
          {
            index: true,
            element: <UserDetail />,
            loader: fetchUserLoader,             
          },
          {
            path: "userdetail/:userId/posts",
            children: [
              {
                index: true,
                element: <Posts />
              }
            ]
          },
          {
            path: "userdetail/:userId/albums",
            children: [
              {
                index: true,
                element: <Albums />,                
              }
            ],
          },          
        ],  

      },
      {
        path: "/favorites",
        element: <Favorites />
      }      
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)