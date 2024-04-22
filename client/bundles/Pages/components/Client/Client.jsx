import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import axios from "axios";
import _ from "lodash";
import setRequestHeaders from '../RequestHeaders';

const Client = ({client, getClients}) => {
  const [firstName, setFirstName] = useState(client.first_name);
  const [lasttName, setLastName] = useState(client.last_name);
  const [email, setEmail] = useState(client.email);

  const path = `/api/v1/clients/${client.id}`;

  const updateClient = _.debounce(() => {
    setRequestHeaders();
    axios
      .put(path, {
        client: {
          first_name: firstName,
          last_name: lasttName,
          email,
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
  console.log('using effect')
  updateClient();
}, [firstName, lasttName, email])

  const handleDestroy = () => {
    setRequestHeaders();
    
    const confirmation = confirm("Are you sure?");
        if (confirmation) {
          axios
            .delete(path)
            .then((response) => {
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
            defaultValue={client.first_name}
            onChange={(e) => setFirstName(e.target.value)}
            className="form-control"
            id={`client__firstName-${client.id}`}
          />
        </td>
        <td>
          <input
            type="text"
            defaultValue={client.last_name}
            onChange={(e) => setLastName(e.target.value)}
            className="form-control"
            id={`client__lastName-${client.id}`}
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