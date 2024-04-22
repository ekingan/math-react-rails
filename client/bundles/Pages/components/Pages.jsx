import React, { useState, useEffect } from 'react';
import { 
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom'
import axios from "axios";

import Clients from './Client/Clients';
import Jobs from './Job/Jobs';

const Pages = () => {
  const [clients, setClients] = useState(null);
  const [categories, setCategories] = useState(null);
  const getClientList = () => {
    axios.get("/api/v1/clients")
          .then((response) => {
            const clients = response.data;
            setClients(clients);
          })
          .catch((error) => {
            console.log(error);
          });
  };

  const getCategories = () => {
    axios.get("/api/v1/categories").then((response) => {
      const categories = response.data;
      setCategories(categories);
    }).catch((error) => {
      console.log(error)
    });
  };

  useEffect(() => {
    getClientList();
    getCategories();
  }, []);

  console.log({categories})

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
  return (
    <RouterProvider router={router} />
  );
};

export default Pages;