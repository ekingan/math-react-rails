import React, { useState, useEffect } from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom'
import axios from "axios";
import Container from 'react-bootstrap/Container';
import Spinner from 'react-bootstrap/Spinner';
import Clients from './Client';
import Jobs from './Job';
import Dashboard from './Dashboard';
import ErrorMessage from './shared/ErrorMessage'

const Pages = () => {
  const [clients, setClients] = useState(null);
  const [jobs, setJobs] = useState(null);
  const [categories, setCategories] = useState(null);
  const [error, setError] = useState(null);

  const getJobs = () => {
    axios.get("/api/v1/jobs")
      .then((response) => {
        const jobs = response.data;
        setJobs(jobs);
      })
      .catch((error) => {
        console.log(error);
      });
  };

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
    getJobs();
    getClientList();
    getCategories();
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Dashboard jobs={jobs} getJobs={getJobs} setJobs={setJobs} clients={clients} categories={categories} />,
    },
    {
      path: "clients",
      element: <Clients clients={clients} getClients={getClientList} categories={categories} />,
    },
    {
      path: "jobs",
      element: <Jobs clients={clients} categories={categories} getJobs={getJobs} jobs={jobs} />,
    },
  ]);
  if (error) <ErrorMessage error={error} />
  if (clients && categories && jobs) {
    return (
      <Container>
        <RouterProvider router={router} />
      </Container>

    );
  } else {
    return (
      <Container>
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    )
  }
};

export default Pages;