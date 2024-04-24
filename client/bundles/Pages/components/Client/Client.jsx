import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import Select from "react-select";
import axios from "axios";
import _ from "lodash";
import setRequestHeaders from '../RequestHeaders';
import { optionsMap  } from '../../utilities';

const Client = ({client, getClients, categories}) => {
  const [firstName, setFirstName] = useState(client.first_name);
  const [lasttName, setLastName] = useState(client.last_name);
  const [email, setEmail] = useState(client.email);
  const [selectedCategories, setSelectedCategories] = useState(categories && categories.filter((category) => client.category_ids.includes(category.id)).map(({id: value, name: label})=>({value, label})));
  const [categoryOptions, setCategoryOptions] = useState(null);

  const path = `/api/v1/clients/${client.id}`;

  const updateClient = _.debounce(() => {
    setRequestHeaders();
    const categoryIds = selectedCategories && selectedCategories.map((category) => category.value);
    console.log(client.last_name)
    console.log({categoryIds})

    axios
      .put(path, {
        client: {
          first_name: firstName,
          last_name: lasttName,
          email,
          category_ids: categoryIds,
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
    if (categories) {
      setCategoryOptions(optionsMap(categories));
    }
    updateClient();
  }, [firstName, lasttName, email, categories, selectedCategories])

  const handleDestroy = () => {
    setRequestHeaders();
    
  const confirmation = confirm("Are you sure?");
    if (confirmation) {
      axios
        .delete(path)
        .then(() => {
          getClients();
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
            defaultValue={client.last_name}
            onChange={(e) => setLastName(e.target.value)}
            className="form-control"
            id={`client__lastName-${client.id}`}
          />
        </td>
        <td>
          <input
            type="text"
            defaultValue={client.first_name}
            onChange={(e) => setFirstName(e.target.value)}
            className="form-control"
            id={`client__firstName-${client.id}`}
          />
        </td>
        <td className="text-right">
          <input
            type="text"
            defaultValue={client.email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-control"
            id={`client__email-${client.id}`}
          />
        </td>
        <td>
          <Select
            placeholder="select client types"
            defaultValue={selectedCategories}
            onChange={setSelectedCategories}
            options={categoryOptions}
            isMulti
          />
        </td>
        <td>
        <button onClick={handleDestroy} className="btn btn-outline-danger">Delete</button>
        </td>
       
      </tr>
    );
};

export default Client;

Client.propTypes = {
  client: PropTypes.object.isRequired,
  getClients: PropTypes.func.isRequired,
};