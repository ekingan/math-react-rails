import React, { useEffect, useState } from 'react';
import axios from "axios";
import Client from './Client';
import ClientForm from './ClientForm';
import 'bootstrap/dist/css/bootstrap.css';

const Clients = () => {
  const [clients, setClients] = useState(null);

  const getClientList = () => {
    axios.get("/api/v1/clients")
          .then((response) => {
            const clients = response.data;
            setClients(clients);
          })
          .catch((error) => {
            console.log(error);
          });
  };

  const createClient = (client) => {
    const newClientList = [ client, ...clients]
    setClients(newClientList); 
  }

  useEffect(() => {
    getClientList();
  }, []);

  return (
    <>
      <ClientForm createClient={createClient}/>
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Last Name</th>
              <th scope="col">First Name</th>
              <th scope="col" className="text-right">
                Email
              </th>
            </tr>
          </thead>
          <tbody>
            {clients && clients.map((client) => <Client client={client} getClients={getClientList} key={client.id}/>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Clients;
