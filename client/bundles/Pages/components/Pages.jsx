import React, { useState, useEffect } from 'react';
import { 
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom'
import axios from "axios";

import Clients from './Client/Clients';
import Jobs from './Job/Jobs';
import ErrorMessage from './ErrorMessage'

const Pages = () => {
  const [clients, setClients] = useState(null);
  const [categories, setCategories] = useState(null);
  const [error, setError] = useState(null);

  const getClientList = () => {
    axios.get("/api/v1/clients")
          .then((response) => {
            const clients = response.data;
            setClients(clients);
          })
          .catch((error) => {
            setError(error)
          });
  };

  const getCategories = () => {
    axios.get("/api/v1/categories").then((response) => {
      const categories = response.data;
      setCategories(categories);
    }).catch((error) => {
      setError(error)
    });
  };

  useEffect(() => {
    getClientList();
    getCategories();
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Clients clients={clients} getClients={getClientList} setClients={setClients} categories={categories}/>,
    },
    {
      path: "clients",
      element: <Clients clients={clients} getClients={getClientList} setClients={setClients} categories={categories}/>,
    },
    {
      path: "jobs",
      element: <Jobs clients={clients} categories={categories}/>,
    },
  ]);
  if (error) <ErrorMessage error={error}/>
  if (clients && categories) {
    return (
       <div className='container'>
        <RouterProvider router={router} />
      </div>

    );
  } else {
    <div class="spinner-border" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  }
};

export default Pages;