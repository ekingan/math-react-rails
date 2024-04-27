import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Table from 'react-bootstrap/Table';
import axios from "axios";
import Job from './Job';
import JobForm from './JobForm';
import 'bootstrap/dist/css/bootstrap.css';

const Jobs = ({ clients, categories }) => {
  const [allJobs, setAllJobs] = useState(null);
  const [filteredJobs, setFilteredJobs] = useState(null);
  const [statusFilter, setStatusFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [paidFilter, setPaidFilter] = useState(null);
  const [yearFilter, setYearFilter] = useState(null);
  const [priceFilter, setPriceFilter] = useState(null);
  const [clientFilter, setClientFilter] = useState('')

  const getJobs = () => {
    axios.get("/api/v1/jobs")
      .then((response) => {
        const jobs = response.data;
        setAllJobs(jobs);
        setFilteredJobs(jobs);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const createJob = (job) => {
    const newJobList = [job, ...allJobs]
    setAllJobs(newJobList);
    setFilteredJobs(newJobList);
  }

  useEffect(() => {
    getJobs();
  }, []);

  useEffect(() => {
    let filtered = allJobs;
    if (statusFilter != '') filtered = filtered?.filter((job) => job.status.includes(statusFilter));
    if (paidFilter) filtered = filtered?.filter((job) => String(job.paid) === paidFilter);
    if (yearFilter) filtered = filtered?.filter((job) => job.year == yearFilter);
    if (priceFilter) filtered = filtered?.filter((job) => job.price == priceFilter);
    if (clientFilter != '') {
      const clientIds = clients?.filter((client) => client.first_name.toLowerCase().includes(clientFilter.toLowerCase()) || client.last_name.toLowerCase().includes(clientFilter.toLowerCase())).map((client) => client.id);
      filtered = filtered?.filter((job) => clientIds.includes(job.client_id));
    }
    if (typeFilter != '') {
      const categoryIds = categories?.filter((category) => category.name.includes(typeFilter)).map((category) => category.id);
      filtered = filtered?.filter((job) => categoryIds.includes(job.category_id));
    }
    setFilteredJobs(filtered)
  }, [statusFilter, paidFilter, yearFilter, priceFilter, clientFilter, typeFilter]);

  const resetFilters = () => {
    setStatusFilter('');
    setPaidFilter(null);
    setYearFilter(null);
    setPriceFilter(null);
    setClientFilter('');
    setTypeFilter('');
  }

  return (
    <>
      <JobForm createJob={createJob} clients={clients} categories={categories} />
      <div className="table-responsive">
        <Table striped hover responsive>
          <thead>
            <tr>
              <th scope="col">Client
                <input
                  type="text"
                  defaultValue={clientFilter}
                  onChange={(e) => setClientFilter(e.target.value)}
                  className="form-control"
                  placeholder='search'
                />
              </th>
              <th scope="col">Year
                <input
                  type="number"
                  defaultValue={yearFilter}
                  onChange={(e) => setYearFilter(e.target.value)}
                  className="form-control"
                  placeholder='search'
                />
              </th>
              <th scope="col">Type
                <input
                  type="text"
                  defaultValue={""}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  className="form-control"
                  placeholder='search'
                />
              </th>
              <th scope="col">Price
                <input
                  type="number"
                  defaultValue={priceFilter}
                  onChange={(e) => setPriceFilter(e.target.value)}
                  className="form-control"
                  placeholder='search'
                />
              </th>
              <th scope="col">Paid
                <DropdownButton variant='light' title='Select' onSelect={(e) => setPaidFilter(e)}>
                  <Dropdown.Item eventKey={null}>All</Dropdown.Item>
                  <Dropdown.Item eventKey={false}>Unpaid</Dropdown.Item>
                  <Dropdown.Item eventKey={true}>Paid</Dropdown.Item>
                </DropdownButton>
              </th>
              <th scope="col" className="text-right">
                Status
                <input
                  type="text"
                  defaultValue={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="form-control"
                  placeholder='search'
                />
              </th>
              <th>
                <Button onClick={(e) => resetFilters()} variant="outline-success">
                  Reset
                </Button>
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredJobs && filteredJobs.map((job) => <Job job={job} getJobs={getJobs} key={job.id} clients={clients} categories={categories} />
            )}
          </tbody>
        </Table>
      </div>
    </>
  );
};

Jobs.propTypes = {
  clients: PropTypes.array.isRequired,
  categories: PropTypes.object.isRequired,

};

export default Jobs;
