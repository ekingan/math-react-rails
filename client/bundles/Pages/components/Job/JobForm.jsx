import React, {useState} from "react";
import PropTypes from "prop-types";

import axios from "axios";
import setRequestHeaders from "../RequestHeaders";
import { statuses } from '../../utilities';

const JobForm = ({createJob, clients, categories}) => {
  const [clientId, setClientId] = useState(null);
  const [categoryId, setCategoryId] = useState(null);
  const [year, setYear] = useState(new Date().getFullYear() - 1);
  const [status, setStatus] = useState('todo');

  const resetForm = () => {
    setClient(null);
    setYear(new Date().getFullYear() - 1);
    setStatus('todo');
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setRequestHeaders();
    axios
      .post("/api/v1/jobs", {
        job: {
          client_id: clientId,
          year,
          status,
          category_id: categoryId,
        },
      })
      .then((response) => {
        const job = response.data;
        createJob(job);
        resetForm();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)} className="my-3">
      <div className="form-row">
        <div className="form-group col-md-8">
          <input
            type="text"
            name="year"
            required
            className="form-control"
            id="year"
            placeholder='Year'
            defaultValue={year}
            onChange={(e) => setYear(e.target.value)}
          />
          <label>
            <select className="form-select" value={status} onChange={(e) => setStatus(e.target.value)}>
              {statuses.map((status) => <option value={status}> {status} </option>
              )}
            </select> 
          </label>
          <label>
            <select className="form-select" onChange={(e) => setClientId(e.target.value)}>
              <option selected>Select a client</option>
              {clients && clients.map((client) => <option value={client.id}> {`${client.last_name}, ${client.first_name}`} </option>
              )}
            </select> 
          </label>
          <label>
          <select className="form-select" onChange={(e) => setCategoryId(e.target.value)}>
            <option selected>Select a type</option>
            {categories && categories.map((category) => <option value={category.id}> {category.name} </option>
            )}
          </select> 
          </label>
        </div>
        <div className="form-group col-md-4">
          <button className="btn btn-outline-success btn-block">
            Add Job
          </button>
        </div>
      </div>
    </form>
  );
}

JobForm.propTypes = {
  createClient: PropTypes.func.isRequired,
};

export default JobForm;
