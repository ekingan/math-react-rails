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

  useEffect(() => {
    getClientList();
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Clients clients={clients} getClients={getClientList} setClients={setClients}/>,
    },
    {
      path: "clients",
      element: <Clients clients={clients} getClients={getClientList} setClients={setClients}/>,
    },
    {
      path: "jobs",
      element: <Jobs clients={clients}/>,
    },
  ]);
  return (
    <RouterProvider router={router} />
  );
};

export default Pages;