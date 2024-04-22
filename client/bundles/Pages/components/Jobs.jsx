import React, { useEffect, useState } from 'react';
import axios from "axios";
import Job from './Job';
import JobForm from './JobForm';
import 'bootstrap/dist/css/bootstrap.css';

const Jobss = () => {
  const [jobs, setJobs] = useState(null);

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

  const createJob = (job) => {
    const newJobList = [ job, ...jobs]
    setJobs(newJobList); 
  }

  useEffect(() => {
    getJobs();
  }, []);

  return (
    <>
      <JobForm createJob={createJob}/>
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Client</th>
              <th scope="col">Year</th>
              <th scope="col" className="text-right">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {jobs && jobs.map((job) => <Job job={job} getJobs={getJobs} key={job.id}/>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Jobs;
