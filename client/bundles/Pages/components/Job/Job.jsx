import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import axios from "axios";
import _ from "lodash";
import setRequestHeaders from '../RequestHeaders';
import { statuses } from '../../utilities';

const Job = ({job, getJobs, clients}) => {
  const [client, setClient] = useState(clients && clients.filter((client) => client.id === job.client_id )[0]);
  const [clientId, setClientId] = useState(job.client_id);
  const [year, setYear] = useState(job.year);
  const [status, setStatus] = useState(job.status);

  console.log({client})

  const path = `/api/v1/jobs/${job.id}`;

  const updateJob = _.debounce(() => {
    setRequestHeaders();
    axios
      .put(path, {
        job: {
          client_id: clientId,
          year,
          status,
          category_id: 1,
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
          <select class="form-select" onChange={(e) => setClientId(e.target.value)}>
            <option selected>{`${client.last_name}, ${client.first_name}`}</option>
            {clients && clients.map((client) => <option value={client.id}> {`${client.last_name}, ${client.first_name}`} </option>
            )}
          </select> 
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
        <select class="form-select" value={status} onChange={(e) => setStatus(e.target.value)}>
              {statuses.map((status) => <option value={status}> {status} </option>
        
              )}
            </select> 
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