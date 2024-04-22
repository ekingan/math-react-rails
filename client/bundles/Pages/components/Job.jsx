import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import axios from "axios";
import _ from "lodash";
import setRequestHeaders from './RequestHeaders';

const Job = ({job, getJobs}) => {
  const [client, setClient] = useState(job.client);
  const [year, setYear] = useState(job.year);
  const [status, setStatus] = useState(job.status);

  const path = `/api/v1/jobs/${job.id}`;

  const updateJob = _.debounce(() => {
    setRequestHeaders();
    axios
      .put(path, {
        job: {
          client,
          year,
          status,
        },
      })
      .then((response) => {
        console.log({response})
      })
      .catch((error) => {
        console.log(error);
      });
  }, 1000);

useEffect(() => {
  updateJob();
}, [client, year, status])

  const handleDestroy = () => {
    setRequestHeaders();
    
    const confirmation = confirm("Are you sure?");
        if (confirmation) {
          axios
            .delete(path)
            .then((response) => {
              getJobs();
            })
            .catch((error) => {
              console.log(error);
            });
        }
  };
  return (
      <tr>
        <td>
          <input
            type="text"
            defaultValue={job.client}
            onChange={(e) => setClient(e.target.value)}
            className="form-control"
            id={`job__client-${job.id}`}
          />
        </td>
        <td>
          <input
            type="text"
            defaultValue={job.year}
            onChange={(e) => setYear(e.target.value)}
            className="form-control"
            id={`job__year-${job.id}`}
          />
        </td>
        <td className="text-right">
          <input
            type="text"
            defaultValue={job}
            onChange={(e) => setStatus(e.target.value)}
            className="form-control"
            id={`job__status-${job.id}`}
          />
        </td>
        <td>
        <button onClick={handleDestroy} className="btn btn-outline-danger">Delete</button>
        </td>
       
      </tr>
    );
};

export default Job;

Job.propTypes = {
  job: PropTypes.object.isRequired,
  getJobs: PropTypes.func.isRequired,
};