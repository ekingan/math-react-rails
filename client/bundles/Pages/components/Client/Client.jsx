import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import Select from "react-select";
import Button from 'react-bootstrap/Button';
import axios from "axios";
import _ from "lodash";
import setRequestHeaders from '../RequestHeaders';
import { optionsMap, defaultDate, statuses } from '../../utilities';

const Client = ({ client, deleteClient, activateClient, categories }) => {
  const [firstName, setFirstName] = useState(client.first_name);
  const [lasttName, setLastName] = useState(client.last_name);
  const [email, setEmail] = useState(client.email);
  const [selectedCategories, setSelectedCategories] = useState(categories && categories.filter((category) => client.category_ids.includes(category.id)).map(({ id: value, name: label }) => ({ value, label })));
  const [categoryOptions, setCategoryOptions] = useState(null);

  const path = `/api/v1/clients/${client.id}`;

  const updateClient = _.debounce(() => {
    setRequestHeaders();
    const categoryIds = selectedCategories && selectedCategories.map((category) => category.value);
    axios
      .put(path, {
        client: {
          first_name: firstName,
          last_name: lasttName,
          email,
          category_ids: categoryIds,
        },
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
          deleteClient(client);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const handleUnarchive = () => {
    setRequestHeaders();
    const confirmation = confirm("Are you sure?");
    if (confirmation) {
      const activatePath = `${path}/activate`
      axios.post(activatePath)
        .then(() => {
          activateClient(client);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const createJobFromClient = () => {
    const path = '/api/v1/jobs/';
    setRequestHeaders();
    axios
      .post(path, {
        job: {
          client_id: client.id,
          year: defaultDate,
          status: statuses.indexOf('todo'),
          category_id: categories.find((category) => category.name === 'individual').id,
          paid: false,
          price: null
        },
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <tr className={client.archived ? 'table-secondary' : ''}>
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
        <Button variant='outline-primary' onClick={createJobFromClient}>New Job</Button>
        {client.archived ?
          <Button variant='outline-success' onClick={handleUnarchive}>Activate</Button> :
          <Button variant='outline-danger' onClick={handleDestroy}>Delete</Button>
        }
      </td>

    </tr>
  );
};

export default Client;

Client.propTypes = {
  client: PropTypes.object.isRequired,
  deleteClientClients: PropTypes.func.isRequired,
};