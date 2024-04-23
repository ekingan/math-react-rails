import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import Select, { MultiValue } from "react-select";

import axios from "axios";
import setRequestHeaders from "../RequestHeaders";

const ClientForm = ({createClient, categories}) => {
  const [firstName, setFirstName] = useState('');
  const [lasttName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [selectedCategories, setSelectedCategories] = useState(null);
  const [categoryOptions, setCategoryOptions] = useState(null);

  console.log(categoryOptions);

  const resetForm = () => {
    setFirstName('');
    setLastName('');
    setEmail('');
  }

  useEffect(() => {
    if (categories) {
      const opts = categories?.map(({id: value, name: label})=>({value, label}));
      setCategoryOptions(opts)
    }
  }, [categories])

  const handleSubmit = (e) => {
    e.preventDefault();
    setRequestHeaders();
    axios
      .post("/api/v1/clients", {
        client: {
          first_name: firstName,
          last_name: lasttName,
          email,
          categories: selectedCategories,
        },
      })
      .then((response) => {
        const client = response.data;
        createClient(client);
      })
      .catch((error) => {
        console.log(error);
      });
    resetForm();
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)} className="my-3">
      <div className="form-row">
        <div className="form-group col-md-8">
          <input
            type="text"
            name="firstName"
            required
            className="form-control"
            id="firstName"
            placeholder='first name'
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input
            type="text"
            name="lastName"
            required
            className="form-control"
            id="lastName"
            placeholder='last name'
            onChange={(e) => setLastName(e.target.value)}
          />
          <input
            type="text"
            name="email"
            required
            className="form-control"
            id="email"
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Select
            placeholder="select client types"
            defaultValue={selectedCategories}
            onChange={setSelectedCategories}
            options={categoryOptions}
            isMulti
          />
        </div>
        <div className="form-group col-md-4">
          <button className="btn btn-outline-success btn-block">
            Add Client
          </button>
        </div>
      </div>
    </form>
  );
}

export default ClientForm;

ClientForm.propTypes = {
  createClient: PropTypes.func.isRequired,
};