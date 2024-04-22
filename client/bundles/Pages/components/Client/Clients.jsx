import React, { useEffect, useState } from 'react';
import Client from './Client';
import ClientForm from './ClientForm';
import 'bootstrap/dist/css/bootstrap.css';

const Clients = ({clients, setClients, getClients}) => {
  const createClient = (client) => {
    const newClientList = [ client, ...clients]
    setClients(newClientList); 
  }

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
            {clients && clients.map((client) => <Client client={client} getClients={getClients} key={client.id}/>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Clients;
