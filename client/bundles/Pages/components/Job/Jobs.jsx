import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from "axios";
import Job from './Job';
import JobForm from './JobForm';
import 'bootstrap/dist/css/bootstrap.css';

const Jobs = ({clients, categories}) => {
  const [jobs, setJobs] = useState(null);

  const getJobs = () => {
    console.log({jobs})
    axios.get("/api/v1/jobs")
          .then((response) => {
            console.log({response})
            const jobs = response.data;
            setJobs(jobs);
          })
          .catch((error) => {
            console.log(error);
          });
  };

  const createJob = (job) => {
    const newJobList = [ job, ...jobs]
    setJobs(newJobList); 
  }

  useEffect(() => {
    getJobs();
  }, []);

  return (
    <>
      <JobForm createJob={createJob} clients={clients} categories={categories}/>
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Client</th>
              <th scope="col">Year</th>
              <th scope="col">Type</th>
              <th scope="col" className="text-right">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {jobs && jobs.map((job) => <Job job={job} getJobs={getJobs} key={job.id} clients={clients} categories={categories}/>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

Jobs.propTypes = {
  clients: PropTypes.array.isRequired,
  categories: PropTypes.object.isRequired,
 
};

export default Jobs;
