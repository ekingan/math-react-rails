import React from 'react';
import { 
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom'

import Clients from './Clients';

const Pages = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Clients/>,
    },
    {
      path: "clients",
      element: <Clients/>,
    },
  ]);
  return (
    <RouterProvider router={router} />
  );
};

export default Pages;