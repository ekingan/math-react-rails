import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Select from "react-select";
import Table from 'react-bootstrap/Table';
import Job from './Job';
import JobForm from './JobForm';
import { statuses } from '../../utilities';
import 'bootstrap/dist/css/bootstrap.css';

const Jobs = ({ clients, categories, getJobs, jobs }) => {
  const [allJobs, setAllJobs] = useState(jobs);
  const [filteredJobs, setFilteredJobs] = useState(jobs);
  const [statusFilter, setStatusFilter] = useState([]);
  const [typeFilter, setTypeFilter] = useState('');
  const [paidFilter, setPaidFilter] = useState(null);
  const [yearFilter, setYearFilter] = useState(null);
  const [priceFilter, setPriceFilter] = useState(null);
  const [clientFilter, setClientFilter] = useState('');

  const createJob = (job) => {
    const newJobList = [job, ...allJobs]
    setAllJobs(newJobList);
    setFilteredJobs(newJobList);
    getJobs();
  }

  const defaultStatusOptions = statuses.map((status) => ({ 'value': status, 'label': status }));
  
  const setStatusOptions = (e) => setStatusFilter(e);

  useEffect(() => {
    setAllJobs(jobs);
    setFilteredJobs(jobs);
    setStatusFilter(defaultStatusOptions);
  }, []);

  useEffect(() => {
    let filtered = allJobs;
    if (statusFilter != []) filtered = filtered?.filter((job) => statusFilter.map((status) => status['value']).includes(job.status));
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
                  placeholder='search by client'
                />
              </th>
              <th scope="col">Year
                <input
                  type="number"
                  defaultValue={yearFilter}
                  onChange={(e) => setYearFilter(e.target.value)}
                  className="form-control"
                  placeholder='search by year'
                />
              </th>
              <th scope="col">Type
                <input
                  type="text"
                  defaultValue={""}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  className="form-control"
                  placeholder='search by type'
                />
              </th>
              <th scope="col">Price
                <input
                  type="number"
                  defaultValue={priceFilter}
                  onChange={(e) => setPriceFilter(e.target.value)}
                  className="form-control"
                  placeholder='search by price'
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
                <Select
                  placeholder="search by status"
                  defaultValue={defaultStatusOptions}
                  onChange={(e) => setStatusOptions(e)}
                  options={defaultStatusOptions}
                  value={statusFilter}
                  isMulti
                />
              </th>
              <th>
                <Button onClick={(_) => resetFilters()} variant="outline-success">
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


export default Jobs;
