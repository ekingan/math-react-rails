import React, { useState } from 'react';
import Client from './Client';
import ClientForm from './ClientForm';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.css';

const Clients = ({ clients, getClients, categories }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filtered, setFilter] = useState(clients.filter((client) => client.archived === false));
  const [allClients, setAllClients] = useState(clients)
  const [showArchived, setShowArchived] = useState(false)

  const createClient = (client) => {
    const newClientList = [client, ...allClients];
    setAllClients(newClientList);
    setFilter(newClientList);
    getClients();
  };

  const handleSearch = (term) => {
    setSearchTerm(term)
    if (term === '') {
      setAllClients(allClients);
    } else {
      const filtered = allClients.filter(
        (item) =>
          item.last_name.toLowerCase().includes(term) ||
          item.first_name.toLowerCase().includes(term)
      );
      setFilter(filtered);
    }
  };

  const handleShowArchived = (e) => {
    setShowArchived(!showArchived)
    if (showArchived) {
      setFilter(clients.filter((client) => client.archived === false));
    } else {
      setFilter(allClients);
    }
  };


  return (
    <Container>
      <Row>
        <ClientForm createClient={createClient} categories={categories} />
      </Row>
      <Row>
        <Col>
          <input
            type="text"
            defaultValue={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            className="form-control"
            placeholder='search'
          />
        </Col>
        <Col>
          <div class="form-check form-switch">
            <input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault" onChange={(e) => handleShowArchived(e.target.value)} />
            <label class="form-check-label" for="flexSwitchCheckDefault">Show Archived</label>
          </div>
        </Col>
      </Row>
      <Table striped hover responsive>
        <thead>
          <tr>
            <th scope="col">Last Name</th>
            <th scope="col">First Name</th>
            <th scope="col" className="text-right">
              Email
            </th>
            <th scope="col">Type</th>
          </tr>
        </thead>
        <tbody>
          {clients && filtered.map((client) => <Client client={client} getClients={getClients} key={client.id} categories={categories} />
          )}
        </tbody>
      </Table>
    </Container >
  );
};

export default Clients;
