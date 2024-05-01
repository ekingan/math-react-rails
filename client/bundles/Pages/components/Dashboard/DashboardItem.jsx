import React from 'react';
import Job from '../Job/Job';
import Table from 'react-bootstrap/Table';

const DashboardItem = ({ jobs, getJobs, clients, categories }) => {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Client</th>
          <th>Year</th>
          <th>Type</th>
          <th>Price</th>
          <th>Paid</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {jobs && jobs.map((job) => <Job job={job} getJobs={getJobs} key={job.id} clients={clients} categories={categories} />)}
      </tbody>
    </Table>
  )
};

export default DashboardItem;